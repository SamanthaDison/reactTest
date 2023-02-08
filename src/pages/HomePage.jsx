import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0)

  // useEffect() watch effect w/ no saftey checks like vue does; does not prevent inifinte loops;
  // this is your 'global hook' triggers onMounted, offMounted, route change etc....

  useEffect(() => {
    // run this code here when the variables within the array change
    // variables scoped here will not trigger this listener; if I declare a variable outside of here, put it in the array, and alter it's value, the entire code block will run again
    // NOTE running a use effect with simply just the method inside your code block will work appropriately like an onMounted when the array is empty

  }, [])


  // return is the 'render()' equivalent for function based components
  // NOTE this template has all function based components...typescript react uses class based components
  return (
    <div className="home-page">
      <div className="container my-3">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <button className="btn btn-success my-1" onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}