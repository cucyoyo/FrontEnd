import React from "react"
// import "./search.styl"


class Common extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>标题</h1>
        <ul>
          <li>李白</li>
          <li>杜甫</li>
          <li>李商隐</li>
        </ul>
        <div></div>
      </div>
    );
  }
}

export default Common