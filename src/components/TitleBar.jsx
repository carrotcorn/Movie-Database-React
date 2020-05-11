import React from 'react';



class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <h1 className="title">The Movie Database</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TitleBar;