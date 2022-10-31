import React, { useRef, useState } from "react";
import "../styles/ProjectpageStyle.css";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Carousel, { CarouselItem } from "../components/Carousel";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { MyState } from "../components/MyProvider";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ProjectPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError({
      visible: false,
      message: "",
    });
  };

  const [openTnx, setOpenTnx] = React.useState(false);

  const handleOpenTnx = () => {
    setOpenTnx(true);
  };

  const handleCloseTnx = () => {
    setOpenTnx(false);
    setError({
      visible: false,
      message: "",
    });
  };

  const { setActiveAnime } = MyState();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [desc, setDesc] = useState("");
  const [error, setError] = useState({
    visible: false,
    message: "",
  });

  const hanldeChangeNumber = (e) => {
    setPhone(e.target.value);
  };

  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(({ active, movement: [mx], cancel }) => {
    if (-mx > 50) {
      cancel();
      setActiveAnime(false);
    }
    api.start({ x: active ? mx : 0, immediate: active });
  });

  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    display: "flex",
    justifyContent: "center",
  };
  const styleTnx = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
  };

  const Data = [
    {
      id: "1",
      name: "Smart visit Card",
      desc: "perfume Shop Omid",
      img: require("../assets/image/atr_omid.png"),
      linkVisit: "http://i-az.ir/2022",
    },
    {
      id: "2",
      name: "Shahab Massenger",
      desc: "Be closer than ever",
      img: require("../assets/image/logo-Shahab-512.png"),
      linkVisit: "https://chat-app.iran.liara.run/",
    },
    {
      id: "3",
      name: "Practical toolbox",
      desc: "Weather App - Calculator - QR Generator - Speech To Text",
      img: require("../assets/image/weather-news.png"),
      linkVisit: "https://sajad-mhr.github.io/ToolBox/",
    },
  ];
  let pattern = /[0-9]/g;
  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !desc) {
      setError({
        visible: true,
        message: "All fields are required",
      });
    } else if (phone.length < 11) {
      setError({
        visible: true,
        message: "Mobile number must be 11 digits",
      });
    } else if (!phone.match(pattern)) {
      setError({
        visible: true,
        message: "Allow only numbers in mobile number field",
      });
    } else {
      setError({
        visible: false,
        message: "",
      });
      console.log(name, phone, desc);
      handleClose();
      handleOpenTnx();

      // setTimeout(() => {
      //   handleCloseTnx();
      // }, 2000);
    }
  };

  return (
    <div className="projectContainer">
      <div className="header">
        <animated.div
          className="left"
          {...bind()}
          style={{ x, touchAction: "none" }}
        >
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
          <h2>Project</h2>
        </animated.div>
        <div className="right">
          <button className="viewAll">
            <h4>View all </h4>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
      <Carousel>
        {Data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="projectCard">
              <div className="projectImage">
                <img src={item.img} />
              </div>
              <div className="titleProject">
                <h3>{item.name}</h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.desc.length > 22 ? (
                    <p className="descProject">
                      {item.desc.slice(0, 16).concat(" . . . ")}
                    </p>
                  ) : (
                    <p className="descProject">{item.desc}</p>
                  )}
                  <button
                    onClick={() => window.open(`${item.linkVisit}`, "_blank")}
                    className="visitBtn"
                  >
                    Visit
                  </button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={onSubmit} className="requestmodal">
            <h2>Project Request</h2>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name . . ."
            />
            <input
              onChange={hanldeChangeNumber}
              placeholder="Phone . . ."
              maxLength={11}
              type={"tel"}
            />
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description . . ."
            />
            {error && <p>{error.message}</p>}
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={openTnx}
        onClose={handleCloseTnx}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={styleTnx}>
          <div className="modalTnx">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="currentColor"
              class="bi bi-check2-circle"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
            <p>Your request has been sent to us</p>
            <p>We will contact you after checking</p>{" "}
            <button onClick={handleCloseTnx}>OK</button>
          </div>
        </Box>
      </Modal>

      <div className="projectReqContainer">
        <button onClick={handleOpen} className="projectReqBtn">
          {/* <p></p> */}
          Project Request
        </button>
      </div>

      <div className="seperatorCon">
        <div className="seperator"></div>
      </div>

      <div className="teamUsCon">
        <div className="teamUsCard">
          <div className="teamRigth">
            <h2 className="teamTitle">Us Team</h2>
            <p className="teamDesc">
              We are two brother us name is sajad and reza, we are digital
              creator and application developer
            </p>
          </div>
          <div className="teamLeft">
            <div className="teamImgCon">
              <img
                className="teamImg"
                src={require("../assets/image/reza.png")}
              />
              <img
                className="teamImg"
                src={require("../assets/image/profile.jfif")}
              />
            </div>
            <button className="teamBtn">
              Reza Aroozi
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
