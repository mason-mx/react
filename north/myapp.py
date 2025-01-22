from flask import Flask, render_template, request
import flask_excel as excel
import pyexcel as pe

app = Flask(__name__)

class bin(object):
	def __init__(self, productName, partName, binLoc, partNo, unitCost, stockQty, stockVal, lowAlert, minOrderQty):
		self.partNo = partNo
		self.partName = partName
		self.productName = productName
		self.unitCost = unitCost
		self.stockQty = stockQty
		self.stockVal = stockVal
		self.lowAlert = 0
		self.minOrderQty = 0
		if lowAlert:
			self.lowAlert = lowAlert
		if minOrderQty:
			self.minOrderQty = minOrderQty
		if self.stockQty < self.lowAlert:
			self.tableColor = "red"
		else:
			self.tableColor = "green"
		self.binLoc = binLoc
		self.income = 0
		self.out = 0
		self.onOrder = 0
		self.iqc = 0
		self.accept = 0
		self.reject = 0
		self.RMA = 'y'
		self.onOrderDisplay = 'none'
		self.iqcDisplay = 'none'
		self.rejectDisplay = 'none'
		self.html = ''
	def getbinLoc(self):
		#print('bin:', self.binLoc)
		return self.binLoc
	def fetchIncome(self):
		data = pe.get_sheet(file_name=self.filename, sheet_name="Income", start_row=3, start_column=2)
		print(data)
		for element in data:
			if element[0] == self.partNo and element[4] == self.binLoc:
				self.income = element[5]
				break
		print(self.binLoc, 'In:', self.income)
	def getIncomeVal(self):
		return self.income
	def fetchOut(self):
		data = pe.get_sheet(file_name=self.filename, sheet_name="Out", start_row=3, start_column=2)
		print(data)
		for element in data:
			if element[0] == self.partNo and element[4] == self.binLoc:
				self.out = element[5]
				break
		print(self.binLoc, 'Out:', self.out)
	def getOutVal(self):
		return self.out
	def fetchOnOrder(self):
		data = pe.get_sheet(file_name='data.xlsx', sheet_name="On order", start_row=3, start_column=2)
		#print(data)
		for element in data:
			if element[0] == self.partNo and element[4] == self.binLoc:
				try:
					self.onOrder = element[6]
				except:
					self.onOrder = 0
				try:
					self.iqc = element[7]
				except:
					self.iqc = 0
				try:
					self.accept = element[8]
				except:
					self.accept = 0
				try:
					self.reject = element[9]
				except:
					self.reject = 0
				try:
					self.RMA = element[10]
				except IndexError:
					self.RMA = 'n'
				break
		print(self.binLoc, 'OnOrder:', self.onOrder)
		print(self.binLoc, 'IQC:', self.iqc)
		print(self.binLoc, 'Accept:', self.accept)
		print(self.binLoc, 'reject:', self.reject)
		print(self.binLoc, 'RMA:', self.RMA)
		if(self.onOrder > 0):
			self.onOrderDisplay = 'table-cell'
		if(self.iqc > 0):
			self.iqcDisplay = 'table-cell'
		if(self.reject > 0):
			self.rejectDisplay = 'table-cell'
	def populateBin(self):
		#self.fetchIncome()
		#self.fetchOut()
		self.fetchOnOrder()
	def fillHtml(self):
		self.html = """<div class="col-2"><table style="background-color: %s;" class="table table-borderless table-sm">
		<tbody>
		  <tr>
			<td style="border-bottom: 1px solid black;" align="center" colspan="3">%s</td>
		  </tr>
		  <tr>
			<td align="center" colspan="3">%s/%s</td>
		  </tr>
		  <tr>
			<td style="background-color: yellow;display: %s;" align="center" >%d</td>
			<td style="background-color: sienna;display: %s;" align="center" >%d</td>
			<td style="background-color: gray;display: %s;" align="center" >%d</td>
		  </tr>
		  <tr>
			<td align="center" colspan="3">%s</td>
		  </tr>
		</tbody>
	  </table></div>""" %(self.tableColor, self.partNo, self.stockQty, self.lowAlert, self.onOrderDisplay, self.onOrder, self.iqcDisplay, self.iqc, self.rejectDisplay, self.reject, self.binLoc)
	def __html__(self):
		return self.html

class parts(object):
	def __init__(self, productName, partsName):
		self.productName = productName
		self.partsName = partsName
		self.bins = []
		self.stockVal = 0
		self.html = ''
	def getPartsName(self):
		return self.partsName
	def composeHTMLinHome(self):
		self.html = '<div class="row parts">%s</div>' %(self.partsName)
	def composeHTMLinStock(self):
		binHTML = self.composeBinHTML()
		self.html = """<div class="row">
				<div class="col-lg-4 col-md-6 col-sm-12">
					<div class="row parts">%s</div>
					<div class="row">STOCK VALUE: %d</div>
				</div>
				<div class="col-lg-8 col-md-6 col-sm-12">
					<div class="row">%s</div>
				</div>
			</div>""" %(self.partsName, self.stockVal, binHTML)
	def composeBinHTML(self):
		html = ''
		for element in self.bins:
			element.populateBin()
			element.fillHtml()
			html += element.__html__()
		return html
	def __html__(self):
		return self.html

class product(object):
	def __init__(self, productName):
		self.productName = productName
		self.parts = []
		self.html = ''
	def getProductName(self):
		return self.productName
	def getParts(self):
		return self.parts
	def fetchParts(self, productIndex):
		#productIndex = pe.get_sheet(file_name=self.filename, sheet_name="MAINProductindex", start_row=5, start_column=6)
		#print('available parts:', productIndex)
		self.parts = []
		row = 0
		print('productName:', self.productName)
		for element in productIndex:
			if element[0] == self.productName:
				for part in productIndex.row[row]:
					if element[0] == part:
						continue
					print('available parts:', part)
					each = parts(self.productName, part)
					each.composeHTMLinHome()
					self.parts.append(each)
					self.html += each.__html__()
			row = row + 1
		#print self.html
	def fetchPartsByProductName(self):
		productIndex = pe.get_sheet(file_name='data.xlsx', sheet_name="MAINProductindex", start_row=5, start_column=6)
		#print('available parts:', productIndex)
		self.parts = []
		row = 0
		print('productName:', self.productName)
		for element in productIndex:
			if element[0] == self.productName:
				for part in productIndex.row[row]:
					if element[0] == part:
						continue
					print('available parts:', part)
					each = parts(self.productName, part)
					self.parts.append(each)
				break
			row = row + 1
	def populateStock(self):
		stock = pe.get_sheet(file_name='data.xlsx', sheet_name="Bins", start_row=3, start_column=3)
		#print('available stock:', stock)
		for element in self.parts:
			partName = element.getPartsName()
			for each in stock:
				if each[2] == self.productName and each[3] == partName:
					row = bin(self.productName, partName, each[4], each[0], each[5], each[7], each[8], each[9], each[10])
					element.bins.append(row)
					element.stockVal = element.stockVal + each[8]
			print('part stock value:', partName, element.stockVal)
			element.composeHTMLinStock()
	def composeStockHTML(self):
		html = ''
		for element in self.parts:
			html += element.__html__()
		return html
	def composeHTMLinHome(self):
		self.html = '<div class="row product-title"><a href="/%s">%s</a></div>' %(self.productName, self.productName)
	def composeHTMLinStock(self):
		self.html = '<div class="row product-title">%s</div>' %(self.productName)
	def __html__(self):
		return '<div class="col-lg-4 col-md-6 col-sm-12 product">%s</div>' %(self.html)

class inventory(object):
	def __init__(self, filename):
		self.filename = filename
		self.products = []
		self.html = ''
	def populateProducts(self):
		#print 'populateProducts'
		productIndex = pe.get_sheet(file_name=self.filename, sheet_name="MAINProductindex", start_row=5, start_column=6)
		#print('available products:', productIndex)
		for element in productIndex:
			if element[0] is not None:
				each = product(element[0])
				each.composeHTMLinHome()
				each.fetchParts(productIndex)
				self.products.append(each)
	def composeProductsHTML(self):
		html = ''
		for element in self.products:
			html += element.__html__()
		return html
	def composePOsHTML(self):
		html = ''
		temp = """<div class="row">
			<div class="col-12"><h2>PO# %s</h2></div>
			<div class="col-12 col-lg-8">
			<div class="row"><div class="col-12 fs-4">Supplier: XXX</div></div>
			<div class="row"><div class="col-12 fs-4">Status: WIP</div></div>
			<div class="row">
				<div class="col-12 fs-4">Total Amount: $12,000</div>
				<div class="col-12">
				<div class="row mx-0">
					<div class="col-4 bg-success border">2025-03-01</div>
					<div class="col-6 bg-danger border">2025-03-21</div>
				</div>
				</div>
			</div>
			</div>
			<div class="col-12 col-lg-4">
			<div class="row">
				<div class="col-6">
				<div class="d-flex justify-content-center">
					<span>OTD</span>
				</div>
				<canvas id="otd-po-%s"></canvas>
				</div>
				<div class="col-6">
				<div class="d-flex justify-content-center">
					<span>QC Pass</span>
				</div>
				<canvas id="qc-po-%s"></canvas>
				</div>
			</div>
			</div>
		</div>"""
		pos = ['3001','3002']
		for element in pos:
			html += temp %(element, element, element)
		return html

@app.route('/')
def index():
	stock = inventory('data.xlsx')
	stock.populateProducts()
	cols = stock.composeProductsHTML()
	rows = stock.composePOsHTML()
	#return render_template('pos.html', cols=cols)
	return render_template('pos.html', rows=rows)

@app.route('/pos')
def pos():
	return ['3001','3002']

@app.route('/<path:subpath>/otd')
def otd(subpath):
	data = {"3001": [40, 60],
		"3002": [90, 60]}
	return data[subpath]

@app.route('/<path:subpath>/qc')
def qc(subpath):
	data = {"3001": [120, 60],
		"3002": [90, 30]}
	return data[subpath]

@app.route('/<path:subpath>')
def show_subpath(subpath):
	pro = product(subpath)
	pro.composeHTMLinStock()
	subtitle = pro.__html__()
	pro.fetchPartsByProductName()
	pro.populateStock()
	rows = pro.composeStockHTML()
	return render_template('projects.html', subtitle=subtitle, rows=rows)

if __name__ == '__main__':
	excel.init_excel(app)
	app.run(threaded=True, host='0.0.0.0', port=5002)
