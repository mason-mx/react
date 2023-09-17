export function postData(url, data){
  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(json => console.log(json)); 
}

export function putData(url, data, callBackFunc1, callBackFunc2){
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "cache-control": "no-cache"
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(
    (result) => { callBackFunc1(result); },
    (error) => { callBackFunc2(error); }
  )
}

export function getData(url, callBackFunc1, callBackFunc2){
  fetch(url)
  .then(res => res.json())
  .then(
    (result) => { callBackFunc1(result); },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => { callBackFunc2(error); }
  )
}