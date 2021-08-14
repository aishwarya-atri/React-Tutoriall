import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";

function Graphics() {
  const [data, setData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const margin = { top: 40, right: 80, bottom: 80, left: 80 };

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:5000/books");
      let ans = [];

      let dict = {};
      let sample_dict = {};
      for (let book of result.data) {
        if (dict[book["genre"]] == null) {
          dict[book["genre"]] = parseInt(book["quantity"]);
        } else {
          dict[book["genre"]] =
            dict[book["genre"]] + parseInt(book["quantity"]);
        }
        let year = book["published_date"].split("-")[0];
        if (sample_dict[year] == null) {
          sample_dict[year] = parseInt(book["quantity"]);
        } else {
          sample_dict[year] = sample_dict[year] + parseInt(book["quantity"]);
        }
      }
      let sam_ans = [];
      for (let key in dict) {
        let ot = {};

        ot["id"] = key;
        ot["label"] = key;
        ot["value"] = dict[key];

        ans.push(ot);
      }
      for (let key in sample_dict) {
        let line_ot = {};
        line_ot["x"] = key;
        line_ot["y"] = sample_dict[key];
        sam_ans.push(line_ot);
      }
      let total = [
        {
          id: "The number of books published every year",
          data: sam_ans,
        },
      ];
      setSampleData(total);
      setData(ans);
    })();
  }, []);
  return (
    <div className="w-100">
      <div className="m-auto pie">
        <div className="pb-4 pt-4 text-center">
          The representation of the genres in the library!
        </div>
        <ResponsivePie
          margin={margin}
          data={data}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              fontFamily: "cursive",
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div className="line 0 m-auto">
        The Years the books published
        <div className="line_chart">
          <ResponsiveLine
            data={sampleData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=">-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Years",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Number of books released",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-left",
                direction: "column",
                justify: false,
                // translateX: 200,
                // translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 250,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Graphics;
