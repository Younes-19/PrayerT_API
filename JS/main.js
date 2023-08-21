let cityes=[
   {
        arabicName: "مكة المكرمة",
        name:"Makkah al Mukarramah"

   },
   {
        arabicName: "الرياض",
        name:"Ar Riyāḑ"
   },
   {
        arabicName: "تبوك",
        name:"Tabūk"
    },
    {
        arabicName: "جازان",
        name:"Jāzān"
    }

]

for(let city of cityes){
    const content = `
    <option class="bg-dark">${city.arabicName}</option>
    `
    document.getElementById("citites-select").innerHTML += content 
}
   
document.getElementById("citites-select").addEventListener("change", function(){
   
    document.getElementById("nameOfCity").innerHTML= this.value;
    let cityName = ""
    for(let city of cityes){
        if(city.arabicName == this.value){
            cityName = city.name
        }
    }
    getPrayerbyCity(cityName)

    // console.log(this.value)
  
})

function getPrayerbyCity(cityName){
    let params = {
        country: "SA",
        city: cityName

        // city:"	Makkah al Mukarramah"
    }
    
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        const timings = response.data.data.timings
        // document.getElementById("Fajr_Time").innerHTML=timings.Fajr
        fillTime("Fajr_Time",timings.Fajr)
        fillTime("Sunrise_Time",timings.Sunrise)
        fillTime("Dhuhr_time",timings.Dhuhr)
        fillTime("Asr_time",timings.Asr)
        fillTime("Maghrib_time",timings.Maghrib)
        fillTime("Isha_time",timings.Isha)
    
        //dateEN
        const readblDate = response.data.data.date.readable
        const WeekDayN = response.data.data.date.hijri.weekday.ar
        const dateEN = WeekDayN + "  " + readblDate 
        document.getElementById("date_EN").innerHTML= dateEN
         
        //dateAR
        const hijeryDate = response.data.data.date.hijri.date
        const dateAR = WeekDayN + "  " + hijeryDate 
        document.getElementById("date_AR").innerHTML= dateAR
        
        // console.log(WeekDayN + "  " + readblDate  )
        
        // console.log(response.data.data.timings.Fajr);
      })
      .catch(function (error) {
        console.log(error);
       });

}
getPrayerbyCity("Makkah al Mukarramah")

function fillTime(id,time){
    document.getElementById(id).innerHTML=time
}