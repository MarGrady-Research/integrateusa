import axios from "axios";

export const getInfoData = async (year, grade, id, levels) => {

    if (year != undefined && grade != undefined && id != undefined) {

    //   setIsLoading(true);

      let idlevel = '';
      
      if (levels === 0) {
        idlevel = "dist_id";
      } else if (levels === 1) {
        idlevel = "county_id";
      } else if (levels === 2) {
        idlevel = "state_abb";
      }

      const response = await axios.get("http://localhost:8000/api/schools/?year=" + year + "&grade=" + grade + "&" + idlevel + "=" + id);
    //   setInfoData(response.data);
      return(response.data);

    //   getTrendData();
    //   trendData && setIsLoading(false);

      }
    };