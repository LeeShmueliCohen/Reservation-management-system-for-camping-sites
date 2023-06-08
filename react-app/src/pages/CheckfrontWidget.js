import React, { useEffect } from "react";
function CheckfrontWidget({ activePlace, dates, siteId }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//workshop-82-dvir.checkfront.com/lib/interface--0.js";
    document.body.appendChild(script);

    script.onload = () => {
      new window.DROPLET.Widget({
        host: "workshop-82-dvir.checkfront.com",
        pipe: `${process.env.REACT_APP_Link}/checkfront-helper.html`,
        target: "CHECKFRONT_WIDGET_01",
        item_id: activePlace.join(","), // the marked place ids
        category_id: siteId,
        lang_id: "he",
        options: "tabs,hidesearh,hidedates", // settings manage -> integrations -> booking widget -> כל פעם לעשות -> generate code -> כדי לראות מה לשנות

        date: dates.startDate.split("-").join(""), // start date from user input search
        end_date: dates.endDate.split("-").join(""), // end date from user search
        provider: "droplet",
      }).render();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [activePlace, dates, siteId]);

  return (
    <div id="CHECKFRONT_WIDGET_01">
      <p
        id="CHECKFRONT_LOADER"
        style={{
          background:
            "url('//workshop-82-dvir.checkfront.com/images/loader.gif') left center no-repeat",
          padding: "5px 5px 5px 20px",
        }}
      >
        ...מחפש זמינות
      </p>
    </div>
  );
}

export default CheckfrontWidget;
