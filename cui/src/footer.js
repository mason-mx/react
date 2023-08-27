import React from "react"
import "./footer.scss";

const CFooter = () => 
    <footer className="footer">
        <div className="d-flex justify-content-between py-1 px-2">
            <div>Ready</div>
            <div>Copyright &copy; 2018-{(new Date().getFullYear())}, Example Corporation</div>
        </div>
    </footer>

export default CFooter