import { useEffect, useState } from "react";
import axios from "axios";
import {
  FestivalSpot,
  FestivalSpotList,
  SelectTourMode,
  TourLoading,
  TourSpotList,
} from "./tour_spot_components";
import { Loading } from "./atoms/Loading";
import styled from "styled-components";

export const TourLoadingWrapper = styled.div`
  width: 600px;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TourSpot({
  selectedAreaName,
  setSaveTourList,
  dateinfo,
  setIsSlideMode,
  handleDeleteList,
  saveTourList,
}) {
  const [listpage, setListpage] = useState(1);
  const [tourList, setTourList] = useState([]);
  const [festivalList, SetFestivalList] = useState([]);
  const [tourMode, setTourMode] = useState("tour");
  const [baseurl, setBaseurl] = useState();
  const [params, setParams] = useState();
  const [isMainLoading, setIsMainLoading] = useState(false);
  const [maxPage, setMaxPage] = useState();
  //축제조회

  const viewFestival = () => {
    if (festivalList.length >= 1) {
      setTourList((prev) => [...prev]);
    } else {
      setListpage(1);
      setTourList([]);
    }
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "5",
      pageNo: listpage,
      MobileOS: "ETC",
      MobileApp: "APPTest",
      _type: "json",
      eventStartDate: dateinfo.startDay,
      areaCode: selectedAreaName.mainAreaCode,
    });
    setTourMode("festivals");
    setTourList([]);
  };

  const viewTour = () => {
    if (tourList.length >= 1) {
      setTourList((prev) => [...prev]);
    } else {
      setListpage(1);
      setTourList([]);
    }

    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "5",
      pageNo: listpage,
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: selectedAreaName.mainAreaCode,
      sigunguCode: selectedAreaName.subAreaCode,
      contentTypeId: "12",
      _type: "json",
    });
    setTourMode("tour");
    SetFestivalList([]);
  };

  const addList = (index) => {
    setIsSlideMode(true);
    if (tourMode === "tour") {
      if (tourList[index]) {
        setSaveTourList(tourList[index]);
      }
    } else {
      if (festivalList[index]) {
        setSaveTourList(festivalList[index]);
      }
    }
  };

  useEffect(() => {
    if (tourMode === "tour") {
      viewTour();
    } else if (tourMode === "festivals") {
      viewFestival();
    }
  }, [listpage]);

  useEffect(() => {
    if (maxPage < listpage) {
      return;
    }
    setIsMainLoading(true);

    if (baseurl && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      const url = `${baseurl}?${queryString}`;

      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Object.keys(params)[6] === "eventStartDate") {
            console.log(data);
            try {
              const festivalData = data.response.body.items.item;
              const totalcount = data.response.body.totalCount;
              setMaxPage(Math.ceil(totalcount / 5));
              const festivals = festivalData.map((fd) => ({
                contentid: fd.contentid,
                ctitle: fd.title,
                caddr1: fd.addr1,
                caddr2: fd.addr2,
                cfirstimage: fd.firstimage,
                csecondimage: fd.firstimage2,
                clatitude: fd.mapy,
                clongitude: fd.mapx,
                ceventstartdate: fd.eventstartdate,
                ceventenddate: fd.eventenddate,
                ctel: fd.tel,
                contenttypeid: fd.contenttypeid,
              }));
              SetFestivalList((prev) => [...prev, ...festivals]);
              setIsMainLoading(false);
            } catch (error) {
              console.log("축제없음");
              setIsMainLoading(false);
            }

            // setTourMode("festivals");
          } else {
            // 관광지일때
            try {
              console.log(data);
              const tourData = data.response.body.items.item;
              const totalcount = data.response.body.totalCount;
              setMaxPage(Math.ceil(totalcount / 5));
              const tours = tourData.map((td) => ({
                contentid: td.contentid,
                ctitle: td.title,
                caddr1: td.addr1,
                caddr2: td.addr2,
                cfirstimage: td.firstimage,
                csecondimage: td.firstimage2,
                clatitude: td.mapy,
                clongitude: td.mapx,
                contenttypeid: td.contenttypeid,
              }));
              console.log(isMainLoading);
              setTourList((prev) => [...prev, ...tours]);
              setIsMainLoading(false);

              console.log("성공성공서공");
            } catch (error) {
              console.log("관광지 없슴 깡촌임");
              console.log(tourList);
              setIsMainLoading(false);
            }

            // setTourMode("tour");
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
          setIsMainLoading(false);
        });
    }
  }, [baseurl, params]);

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        {/* <AreaWeather></AreaWeather> */}
        <SelectTourMode
          viewTour={viewTour}
          viewFestival={viewFestival}
          tourMode={tourMode}
        ></SelectTourMode>

        {/* tourMode 상태에 따라 다른 목록을 출력 */}
        {tourMode === "tour" ? (
          <>
            {isMainLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "600px",
                  height: "800px",
                }}
              >
                <Loading></Loading>
              </div>
            ) : null}
            <TourSpotList
              isMainLoading={isMainLoading}
              tourList={tourList}
              addList={addList}
              setListpage={setListpage}
              selectedAreaName={selectedAreaName}
              handleDeleteList={handleDeleteList}
              saveTourList={saveTourList}
            ></TourSpotList>
          </>
        ) : tourMode === "festivals" ? (
          <>
            {isMainLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "600px",
                  height: "800px",
                }}
              >
                <Loading></Loading>
              </div>
            ) : null}
            <FestivalSpotList
              festivalList={festivalList}
              addList={addList}
              isMainLoading={isMainLoading}
              setListpage={setListpage}
              selectedAreaName={selectedAreaName}
              dateinfo={dateinfo}
              handleDeleteList={handleDeleteList}
              saveTourList={saveTourList}
            ></FestivalSpotList>
          </>
        ) : null}
      </div>
    </>
  );
}

export default TourSpot;
