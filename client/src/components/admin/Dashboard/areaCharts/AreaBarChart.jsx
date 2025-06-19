import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "./../../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "./../../../../constants/themeConstants";
import "./AreaCharts.scss";
import api from "../../../../axiosInstance";

// const data = [
//   {
//     month: "Jan",
//     Maritime: 70,
//     Aerien: 100,
//   },
//   {
//     month: "Fev",
//     Maritime: 55,
//     Aerien: 85,
//   },
//   {
//     month: "Mar",
//     Maritime: 35,
//     Aerien: 90,
//   },
//   {
//     month: "Avril",
//     Maritime: 90,
//     Aerien: 70,
//   },
//   {
//     month: "Mai",
//     Maritime: 55,
//     Aerien: 80,
//   },
//   {
//     month: "Juin",
//     Maritime: 30,
//     Aerien: 50,
//   },
//   {
//     month: "Juil",
//     Maritime: 32,
//     Aerien: 75,
//   },
//   {
//     month: "Aout",
//     Maritime: 62,
//     Aerien: 86,
//   },
//   {
//     month: "Sep",
//     Maritime: 55,
//     Aerien: 78,
//   },
// ];

const AreaBarChart = () => {

  const [data, setData] = useState([]);
  const mergeArrays = (arr1, arr2) => {
    const merged = [];
    // Boucle pour ajouter les objets du premier tableau
    arr1.forEach((item1) => {
      const month = item1.mois;
      // Trouver l'objet correspondant dans le deuxième tableau
      const item2 = arr2.find((item) => item.mois === month);

      if (item2) {
        // Fusionner les deux objets en un seul
        merged.push({
          mois: month,
          Maritime: item1.Maritime,
          Aerienne: item2.Aerienne,
        });
      } else {
        // Si aucun objet correspondant, ajouter l'objet du premier tableau seul
        merged.push({
          mois: month,
          Maritime: item1.Maritime,
        });
      }
    });

    // Ajouter les éléments restants du deuxième tableau qui n'ont pas de correspondance dans le premier tableau
    arr2.forEach((item2) => {
      const month = item2.mois;
      if (!merged.some((item) => item.mois === month)) {
        merged.push({
          mois: month,
          Aerienne: item2.Aerienne,
        });
      }
    });

    return merged;
  };

  const getByMonth = async () => {
    try {
      const maritime = await api.get("/hbl/count/byMonth/");
      const aerienne = await api.get("/hawb/count/byMonth/");
      // console.log("Maritime");
      // console.log(maritime.data);
      // console.log("Aerienne");
      // console.log(aerienne.data);
      // console.log("Data");
      setData(mergeArrays(maritime.data, aerienne.data));
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  useEffect(() => {
    getByMonth();
  }, []);
  const { theme } = useContext(ThemeContext);

  const formatTooltipValue = (value) => {
    return `${value}k`;
  };

  const formatYAxisLabel = (value) => {
    return `${value}k`;
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Total transactions</h5>
        <div className="chart-info-data">
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>Dans ce année</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="mois"
              tickSize={0}
              axisLine={false}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              tickCount={6}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="Aerienne"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="Maritime"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
