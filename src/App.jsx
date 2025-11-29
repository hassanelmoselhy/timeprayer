import { useEffect, useState } from "react";
import Prayer from "./components/Prayer"
function App() {
  const [prayertime , setprayertime] = useState({})
    const [prayerdate , setprayerdate] = useState('')
        const [citys , setcity] = useState('cairo')


const city = [
  { name: "القاهرة", value: "cairo" },
  { name: "الإسكندرية", value: "alex" },
  { name: "الأقصر", value: "luxor" },
  { name: "أسوان", value: "aswan" }
]; 
useEffect(() => {
  const fetchPrayerTimes = async () => {
    try {
      const today = new Date();
      const day   = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year  = today.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${citys}&country=EG`
      );

      const dataprayer = await response.json();

      setprayertime(dataprayer.data.timings);
      setprayerdate(dataprayer.data.date.gregorian.date);

      console.log(dataprayer.data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchPrayerTimes();
}, [citys]);



  return (
    <>
    <section>
      <div className="container">
        <div className="topsection">
          <div className="city">
           <h3>المدينة</h3>
           <select name=" " id="" onChange={(e)=>setcity(e.target.value)}>
           {city.map((city_obj)=>(
            <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
           ))}
           </select>
          </div>
              <div className="date">
              <h3>التاريخ</h3> 
              <h4>{prayerdate}</h4>
          </div>
          
        </div>
       <Prayer name="الفجر "  title={prayertime.Fajr}/>
       <Prayer name="الضهر "  title={prayertime.Dhuhr} />
      <Prayer name="العصر "  title={prayertime. Asr}/>
      <Prayer name="المغرب "  title={prayertime.Maghrib}/>
      <Prayer name="العشاء "  title={prayertime.Isha}/>


      </div>
      
    </section>
    </>
  )
}

export default App
