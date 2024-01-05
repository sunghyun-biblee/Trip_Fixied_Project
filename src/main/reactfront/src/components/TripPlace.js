import { useEffect, useState } from "react";
import { TripWrapper, Tripbox } from "./TripComponents";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
// const TripSelect = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 30px;
//   background-color: antiquewhite;

//   &.on {
//     min-width: 300px;
//   }
// `;

const PlaceWrapper = styled(TripWrapper)`
  padding-top: 2rem;
`;

const SelectAreaUl = styled.ul`
  width: 375px;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(4, 90px);
  padding: 10px 0 0 0;
  gap: 4px;
`;
const Li = styled.li`
  text-align: center;
  padding: 10px 0;
  color: darkcyan;
  border: 1px solid #27d7ea;
  border-radius: 5px;
  background-color: #cbf0f4;
  cursor: pointer;
`;
const TripArea = styled(motion.div)`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Motion_AreaName = styled(motion.div)`
  position: relative;

  width: 375px;
  height: 100px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
function TripPlace({ weather, dateinfo }) {
  const [tripAreaName, setTripAreaName] = useState({
    mainAreaName: "",
    subAreaName: "",
  });
  const [locations, setLocations] = useState([]); //장소 검색 결과
  const [mainAreaCode, setMainAreaCode] = useState(""); // 메인지역 코드
  const [subAreaCode, setSubAreaCode] = useState("");
  const [subArea, setSubArea] = useState(); // 서브 지역 코드
  const [baseurl, setBaseurl] = useState(""); // api 호출 url
  const [params, setParams] = useState({}); // api 호출 쿼리문
  const [citycode, setCitycode] = useState({ citycode: 1, subCitycode: 2 });
  const Area = [
    {
      value: 1,
      name: "서울",
    },
    {
      value: 2,
      name: "인천",
    },
    {
      value: 3,
      name: "대전",
    },
    {
      value: 4,
      name: "대구",
    },
    {
      value: 5,
      name: "광주",
    },
    {
      value: 6,
      name: "부산",
    },
    {
      value: 7,
      name: "울산",
    },
    {
      value: 8,
      name: "세종시",
    },
    {
      value: 31,
      name: "경기도",
    },
    {
      value: 32,
      name: "강원도",
    },
    {
      value: 33,
      name: "충청북도",
    },
    {
      value: 34,
      name: "충청남도",
    },
    {
      value: 35,
      name: "경상북도",
    },
    {
      value: 36,
      name: "경상남도",
    },
    {
      value: 37,
      name: "전라북도",
    },
    {
      value: 38,
      name: "전라남도",
    },
    {
      value: 39,
      name: "제주도",
    },
  ];

  // const queryString = new URLSearchParams(params).toString();
  // const requrl = `${baseurl}?${queryString}`;

  useEffect(() => {
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
          console.log(
            `citycode:  +${citycode.citycode} + subcitycode:  +${citycode.subCitycode}`
          );
          console.log(data);
          //console.log(Object.keys(params)[8]);
          if (Object.keys(params)[8] === "eventStartDate") {
            const newLocations = [...locations];
            console.log(data.response.body.items);
            for (let i = 0; i < data.response.body.items.length; i++) {
              const newLocation = {
                id: i,
                title: data.items[i].title /*여러가지 더 추가*/,
              };
              newLocations.push(newLocation);
            }
            setLocations(newLocations);
            console.log(newLocations);
          } else if (Object.keys(params)[7] === "contentTypeId") {
            console.log("관광지");
            console.log(data);
          } else if (Object.keys(params)[5] === "_type") {
            console.log("축제");
            console.log(data);
          } else {
            console.log("!@#");
            const areadata = data.response.body.items.item;
            const subAreadata = areadata.map((item) => ({
              value: item.code,
              subAreaname: item.name,
            }));
            setSubArea(subAreadata);
            console.log(subAreadata);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
  }, [baseurl, params]);

  const searchPlace = () => {
    setLocations([]);
    const areaCode = mainAreaCode;
    console.log(areaCode);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: areaCode,
      arrange: "A",
      _type: "json",
      eventStartDate: "20240102",
    });
  };

  const SelectAreaCode = (event) => {
    //메인 지역 선택
    setCitycode({
      citycode: event.target.value,
      ...citycode,
    });
    setTripAreaName({
      ...tripAreaName,
      mainAreaName: event.target.textContent,
    });

    setMainAreaCode(event.target.value);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaCode1"); //서브지역 코드받기
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: `${event.target.value}`,
      _type: "json",
    });
  };
  const SelectSubAreaCode = (event) => {
    console.log(event.target.value);
    setCitycode({
      subCitycode: event.target.value,
      ...citycode,
    });
    setSubAreaCode(event.target.textContent);
    setTripAreaName({
      ...tripAreaName,
      subAreaName: event.target.textContent,
    });
  };
  const AreaVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visable: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

  const SelectTourList = () => {
    //관광지 조회
    console.log(citycode);
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      areaCode: citycode.citycode,
      sigunguCode: citycode.subCitycode,
      contentTypeId: "12",
      _type: "json",
    });
  };

  const SelectFestivalList = () => {
    //행사,축제 조회
    setBaseurl("http://apis.data.go.kr/B551011/KorService1/searchFestival1");
    setParams({
      serviceKey:
        "cHlc2k2XcgjG10dgBDyoxMaS6KxKLHiHN4xtTP6q86EBe+UO09zOLEg6ZTpX9TWrdJPSJcFQYCZ+6fqhkD2ZVA==",
      numOfRows: "50",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "APPTest",
      _type: "json",
      eventStartDate: dateinfo.startDay,
      areaCode: citycode.citycode,
    });
  };

  const update = () => {
    axios
      .get("/test/send")
      .then((response) => {
        alert(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("에러", error);
      });
  };

  //const sampledata = {areacode: 1};

  const codeOut = () => {
    axios
      .post("/test/codeout", {
        areacode: 1,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("에러떴어요 시발", error);
      });
  };
  return (
    <PlaceWrapper>
      <Tripbox>
        {subArea ? (
          <button
            onClick={() => {
              setMainAreaCode();
              setSubArea();
              setTripAreaName({ mainAreaName: "", subAreaName: "" });
            }}
          >
            뒤로가기
          </button>
        ) : null}
        <AnimatePresence>
          <Motion_AreaName style={{ marginTop: "5px" }}>
            {tripAreaName.mainAreaName !== "" ? (
              <TripArea
                key="main"
                initial="hidden"
                animate="visable"
                exit="exit"
                variants={AreaVariants}
              >
                <p>
                  {tripAreaName.mainAreaName ? tripAreaName.mainAreaName : null}
                </p>
              </TripArea>
            ) : null}
            {tripAreaName.mainAreaName !== "" ? (
              <>
                {/* <motion.div
                  initial={{ opacity: "0", scale: 0.5 }}
                  animate={{ opacity: "1", scale: 1 }}
                  exit={{ opacity: "0", scale: 0.5 }}
                  style={{
                    width: "2px",
                    height: "50%",
                    position: "absolute",
                    top: "25%",
                    right: "50%",
                    zIndex: "1",

                    backgroundColor: "rgba(0, 0,0, 0.1)",
                  }}
                ></motion.div> */}
                <motion.img
                  initial={{ opacity: "1", scale: 0.5 }}
                  animate={{ opacity: "1", scale: 1 }}
                  exit={{ opacity: "0", scale: 0.5 }}
                  src="/img/Right.svg"
                  style={{
                    position: "absolute",
                    top: "30%",
                    right: "44%",
                    zIndex: "1",
                    width: "40px",
                    Color: "gray",
                  }}
                ></motion.img>
              </>
            ) : null}
            {tripAreaName.subAreaName !== "" ? (
              <TripArea
                key="sub"
                initial="hidden"
                animate="visable"
                variants={AreaVariants}
                exit="exit"
              >
                <p>
                  {tripAreaName.subAreaName ? tripAreaName.subAreaName : null}
                </p>
              </TripArea>
            ) : null}
          </Motion_AreaName>
        </AnimatePresence>
        <SelectAreaUl>
          {!subArea
            ? Area.map((city) => (
                <Li
                  key={city.value}
                  value={city.value}
                  onClick={SelectAreaCode}
                >
                  {city.name}
                </Li>
              ))
            : subArea.map((subarea) => (
                <Li
                  key={subarea.value + Math.floor(Math.random() * 1000)}
                  value={subarea.value}
                  onClick={SelectSubAreaCode}
                >
                  {subarea.subAreaname}
                </Li>
              ))}
        </SelectAreaUl>
        <button onClick={searchPlace} style={{ marginTop: "20px" }}>
          Search
        </button>
        <button onClick={SelectTourList}>관광지 검색</button>
        <button onClick={update}>update</button>
      </Tripbox>
    </PlaceWrapper>
  );
}

export default TripPlace;
