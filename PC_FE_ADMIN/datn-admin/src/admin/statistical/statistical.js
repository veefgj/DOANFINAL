import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getStatisticsfromDay, getStatisticsfromMonth, getStatisticsfromYear } from "../../api/statistics";

export const Statistical = () => {
    const [yearOfYear, setYearOfYear] = useState(2024)

    const [yearOfMonth, setYearOfMonth] = useState(2024)
    const [month, setMonth] = useState(4)

    const [dataYear, setDataYear] = useState([])
    const [dataMonth, setDataMonth] = useState([])
    const [dataDay, setDataDay] = useState([])

    const [date, setDate] = useState()

    const options = {
      chart: {
          height: 350,
          type: 'line',
          zoom: {
              enabled: true
          }
      },
    
      xaxis: {
          categories: dataYear && dataYear.length > 0 ? dataYear.map(item => `tháng ${item.month}`) : [`Không có dữ liệu của năm ${yearOfYear}`]
      }
  };
    
      const series = [{
        name: `Thu nhâp qua các tháng trong năm (${yearOfYear})`,
        data: dataYear && dataYear.length > 0 ? dataYear.map(item => item.monthlyRevenue) : [`0`]
      }]

    // Tìm kiếm theo năm
    const searchYear = () => {

      getStatisticsfromYear(yearOfYear).then(res => {
        setDataYear(res.data)
      }).catch(e => console.log(e))
    }

    const searchMonth = () => {

      getStatisticsfromMonth(month, yearOfMonth).then(res => {

        setDataMonth(res.data)
      }).catch(e => console.log(e))
    }

    const optionsBar = {
      chart: {
        type: 'bar'
      },     
    }
    const seriesBar = [{
        data: dataMonth && dataMonth.length > 0 ? dataMonth.map(item => ({
          x: item.product_name,
          y: item.total_quantity
        })) : [{x: `Không có dữ liệu của ${month}/${yearOfMonth}`, y: `0`}]
      }]

      var optionsRadial ={
        
        series: [dataDay && dataDay.length > 0 ? dataDay[0].total_revenue : 0],
        options: {
          chart: {
            type: 'polarArea',
          },
          stroke: {
            colors: ['#fff']
          },
          fill: {
            opacity: 0.8
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      };

      const onSearchDate = () => {
        const parsedDate = new Date(date);
       
        getStatisticsfromDay(parsedDate.getUTCDate(), parsedDate.getMonth()+1, parsedDate.getFullYear()).then(res => {

          setDataDay(res.data)
        }).catch(e => console.log(e))
      }
    useEffect(() => {
      const date = new Date();

      getStatisticsfromYear(date.getFullYear()).then(res => {

        setDataYear(res.data)
      }).catch(e => console.log(e))

      getStatisticsfromMonth(date.getMonth() + 1, date.getFullYear()).then(res => {

        setDataMonth(res.data)
      }).catch(e => console.log(e))

      getStatisticsfromDay(date.getUTCDate(), date.getMonth() + 1, date.getFullYear()).then(res => {

        setDataDay(res.data)
      }).catch(e => console.log(e))
    }, [])
    return (
        <div>
            <div className="mb-5">
                Thu nhập (Theo năm):
                <div>
                  <input type="number" placeholder="Nhập năm" value={yearOfYear} onChange={(e) => setYearOfYear(e.target.value)}/>
                  <button onClick={() => searchYear()}>Tìm kiếm</button>
                </div>
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>

            <div className="mb-5">
                Số lượng sản phẩm (Theo tháng):
                <div>
                  <input type="number" placeholder="Nhập năm" value={yearOfMonth} onChange={(e) => setYearOfMonth(e.target.value)}/>
                  <input type="number" placeholder="Nhập tháng" value={month} onChange={(e) => setMonth(e.target.value)}/>

                  <button onClick={() => searchMonth()}>Tìm kiếm</button>
                </div>
                <ReactApexChart options={optionsBar} series={seriesBar} type="bar" height={350} />
            </div>

            <div >
                Tổng thu nhập (Theo ngày):
                <div>
                  <input type="date" placeholder="Nhập năm" onChange={(e) => setDate(e.target.value)}/>
                  <button onClick={() => onSearchDate()}>Tìm kiếm</button>
                </div>
                <ReactApexChart options={optionsRadial} series={optionsRadial.series} type="polarArea" height={350} />
            </div>
        </div>
    )
}