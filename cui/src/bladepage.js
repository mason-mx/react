import React, { useState, useEffect } from 'react';

function Bladepage(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bladeDate, setBladeDate] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost/instrument/chassis1/blade" + props.slot)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBladeDate(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main role="main" className="container main-frame my-2" id="mainFrame">
        <h1>{props.slot}: {bladeDate.model}</h1>
        {JSON.stringify(bladeDate)}
      </main>
    );
  }
}

export default Bladepage;