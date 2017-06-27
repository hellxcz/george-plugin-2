
const innerCardStyle = {
  overflow: 'auto'
};


export default (({header, content, footer}) => (

    <div
      className="overview-block box-saveable box-bottom-btn box-groupable box-canbegrouped box-canbemain box-size-md ui-widget ui-helper-clearfix">
      <div className="displaycard smallbox topbar COLOR_8-bar">

        <div className="innerCard" style={innerCardStyle}>
          <div className="displayinner nameblock showNegative">
            <div className="clearfix showNegative">
              <div>
                <div className="label-sm truncate"> { header } </div>
              </div>
            </div>
          </div>

          <div className="paddedcontainer summarycontainer box-visible-md box-visible-lg">

            { content }

          </div>
          <div className="displayinner bottomButton box-visible-md box-visible-lg">
            <a className="nobubble btn btn-block btn-lg btn-light actionBtn">
              {footer}
            </a>
          </div>
        </div>

      </div>
    </div>

  )

);