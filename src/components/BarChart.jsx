import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { Intern, InternProject, NewPorjects, UserProfile } from "../data/UserData";

const BarChart = () => {
  const isadmin = UserProfile.at(0).IsAdmin;

  return (
    <>
      {isadmin ? (
        <BarChartForAdmin />
      ) : (
        <BarChartInter />
      )}
    </>
  )
}

//for Intern
const BarChartInter = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (InternProject.at(0) != 0) {
      const statusProjects = [
        {
          status: "Working",
          Projects: InternProject[0].filter((e) => e.data.Status === 1).length || 0,
        },
        {
          status: "Reviewing",
          Projects: InternProject[0].filter((e) => e.data.Status === 2).length || 0,
        },
        {
          status: "Completed",
          Projects: InternProject[0].filter((e) => e.data.Status === 3).length || 0,
        },
      ];
    setData(statusProjects);
    }

  }, []);

  const getBarColor = (bar) => {
    switch (bar.data.status) {
      case "Working":
        return tokens("dark").greenAccent[500];
      case "Reviewing":
        return tokens("dark").primary[500];
      case "Completed":
        return tokens("dark").blueAccent[500];
      default:
        return colors.redAccent[500];
    }
  };

  return (
    <ResponsiveBar
      data={data}
      keys={["Projects"]}
      indexBy="status"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.greenAccent[100],
            },
          },
          legend: {
            text: {
              fill: colors.greenAccent[500],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
              fontSize: 11
            },
          },
        },
        legends: {
          text: {
            fill: colors.blueAccent[100],
          },
        },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getBarColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#58bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed816",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "dots",
          },
          id: "dots",
        },
        {
          match: {
            id: "lines",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Status",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Projects",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: '12px 16px',
            color: '#fff',
            background: color,
          }}
        >
          <strong>{'Number of ' + id}</strong>: {value}
        </div>
      )}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} projects in status: ${e.indexValue}`}
    />
  );
};


//For Admin
const BarChartForAdmin = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const statusProjectss = [
      {
        Dept: "Designing Dept.",
        Intern: Intern[0].filter((e) => e.data.department === 'Designing Department').length,
      },
      {
        Dept: "Editing Dept.",
        Intern: NewPorjects[0].filter((e) => e.data.department === 'Editing Department').length,
      },
      {
        Dept: "Development Dept.",
        Intern: NewPorjects[0].filter((e) => e.data.department === 'Development Department').length,
      },
      {
        Dept: "Marketing Dept.",
        Intern: NewPorjects[0].filter((e) => e.data.department === 'Marketing Department').length,
      },
    ];
    setData(statusProjectss);
  }, []);

  const getBarColor = (bar) => {
    switch (bar.data.department) {
      case "Working":
        return tokens("dark").greenAccent[500];
      case "Reviewing":
        return tokens("dark").primary[500];
      case "Completed":
        return tokens("dark").blueAccent[500];
      default:
        return colors.redAccent[500];
    }
  };

  return (
    <ResponsiveBar
      data={data}
      keys={["Intern"]}
      indexBy="Dept"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.greenAccent[100],
            },
          },
          legend: {
            text: {
              fill: colors.greenAccent[500],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
              fontSize: 11
            },
          },
        },
        legends: {
          text: {
            fill: colors.blueAccent[100],
          },
        },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getBarColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#58bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed816",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "dots",
          },
          id: "dots",
        },
        {
          match: {
            id: "lines",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Department",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Intern",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: '12px 16px',
            color: '#fff',
            background: color,
          }}
        >
          <strong>{'Number of ' + id}</strong>: {value}
        </div>
      )}
      role="application"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} Intern in Status: ${e.indexValue}`}
    />
  );
};



export default BarChart;

