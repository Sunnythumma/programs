import React from "react";
import { Spinner } from "react-bootstrap";
import ReactLoading from "react-loading";
import "./loading.scss";

const Loading = () => {
  return (
    <>
      {/* 1 = Spinner Loading */}
      {/* <div className="spinner">
        <Spinner
          className="spinner-loading"
          animation="border"
          variant="warning"
          value={"Loading..."}
        />
      </div> */}

      {/* 2 = React Loading (react-loading npm) */}

      {/* <div className="react-loader">
        <ReactLoading
          type="spinningBubbles"
          color="#ffc107"
          height={170}
          width={170}
        />
      </div> */}

      {/* 3 = Glowing Ring */}

      {/* <div className="ring">
        Loading...
        <span></span>
      </div> */}

      {/* 4 = Glowing Loader */}

      <div className="container">
        <div className="loading-text">
          {/* Loading... */}
          Load<span>ing...</span>
        </div>
        <div className="animation-container">
          <div className="lightning-container">
            <div className="lightning white"></div>
            <div className="lightning red"></div>
          </div>
          <div className="boom-container">
            <div className="shape circle big white"></div>
            <div className="shape circle white"></div>
            <div className="shape triangle big yellow"></div>
            <div className="shape disc white"></div>
            <div className="shape triangle blue"></div>
          </div>
          <div className="boom-container second">
            <div className="shape circle big white"></div>
            <div className="shape circle white"></div>
            <div className="shape disc white"></div>
            <div className="shape triangle blue"></div>
          </div>
        </div>
      </div>

      {/* 5 = Letters Loading  */}

      {/* <div className="loading" data-loading-text="Loading..."></div> */}
    </>
  );
};

export default Loading;



// 1 spinner-loading

// .spinner-loading {
//   position: absolute;
//   width: 100px;
//   height: 100px;
//   left: 50%;
//   top: 50%;
//   background-size: 100%;
//   margin: -50px 0px 0px -50px;
// }

// 2 React Loader

// .react-loader {
//   position: absolute;
//   left: 50%;
//   top: 40%;
//   background-size: 100%;
//   margin: -50px 0px 0px -50px;
// }

// 3 Glowing Ring

// $color: #ffc107;
// $borderPercentage : 50%;
// $height : 150px;

// .ring {
//   position: absolute;
//   top: $borderPercentage;
//   left: $borderPercentage;
//   transform: translate(-$borderPercentage, -$borderPercentage);
//   width: $height;
//   height: $height;
//   border-radius: $borderPercentage;
//   text-align: center;
//   line-height: $height;
//   font-family: sans-serif;
//   font-size: 20px;
//   color: $color;
//   letter-spacing: 4px;
//   text-transform: uppercase;
//   text-shadow: 0 0 10px $color;
//   box-shadow: 0 0 20px #00000080;
// }
// .ring:before {
//   content: "";
//   position: absolute;
//   top: -3px;
//   left: -3px;
//   width: 100%;
//   height: 100%;
//   border: 3px solid transparent;
//   border-top: 3px solid $color;
//   border-right: 3px solid $color;
//   border-radius: $borderPercentage;
//   animation: animateC 2s linear infinite;
// }
// .ring span {
//   display: block;
//   position: absolute;
//   top: calc($borderPercentage - 2px);
//   left: $borderPercentage;
//   width: $borderPercentage;
//   height: 4px;
//   background: transparent;
//   transform-origin: left;
//   animation: animate 2s linear infinite;
// }
// .ring span:before {
//   content: "";
//   position: absolute;
//   width: 16px;
//   height: 16px;
//   border-radius: $borderPercentage;
//   background: $color;
//   top: -6px;
//   right: -8px;
//   box-shadow: 0 0 20px $color;
// }
// @keyframes animateC {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
// @keyframes animate {
//   0% {
//     transform: rotate(45deg);
//   }
//   100% {
//     transform: rotate(405deg);
//   }
// }

// 4 Glowing Loader

// body {
// display: flex;
// justify-content: center;
// align-items: center;
// position: relative;
// background: linear-gradient(to bottom right, #070630 0%, #060454 100%);
// min-height: 100vh;
// }

$warningColor: #ffc107;
$blackColor: #212529;

.loading-text {
  margin-top: 240px;
  text-align: center;
  color: $warningColor;
  font-size: 130px;
  letter-spacing: 20px;
}

//for span
.loading-text span {
  color: $blackColor;
}

.animation-container {
  display: block;
  position: relative;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;

  .lightning-container {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    transform: translateY(-50%);

    .lightning {
      position: absolute;
      display: block;
      height: 12px;
      width: 12px;
      border-radius: 12px;
      transform-origin: 6px 6px;

      animation-name: woosh;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
      animation-direction: alternate;

      &.white {
        background-color: $warningColor;
        box-shadow: 0px 50px 50px 0px transparentize($warningColor, 0.7);
      }

      &.red {
        background-color: $blackColor;
        box-shadow: 0px 50px 50px 0px transparentize($blackColor, 0.7);
        animation-delay: 0.2s;
      }
    }
  }

  .boom-container {
    position: absolute;
    display: flex;
    width: 80px;
    height: 80px;
    text-align: center;
    align-items: center;
    transform: translateY(-50%);
    left: 200px;
    top: -145px;

    .shape {
      display: inline-block;
      position: relative;
      opacity: 0;
      transform-origin: center center;

      &.triangle {
        width: 0;
        height: 0;
        border-style: solid;
        transform-origin: 50% 80%;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
        margin-left: -15px;
        border-width: 0 2.5px 5px 2.5px;
        border-color: transparent transparent #42e599 transparent;
        animation-name: boom-triangle;

        &.big {
          margin-left: -25px;
          border-width: 0 5px 10px 5px;
          border-color: transparent transparent #fade28 transparent;
          animation-name: boom-triangle-big;
        }
      }

      &.disc {
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: #d15ff4;
        animation-name: boom-disc;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
      }

      &.circle {
        width: 20px;
        height: 20px;
        animation-name: boom-circle;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
        border-radius: 100%;
        margin-left: -30px;

        &.white {
          border: 2px solid $warningColor;
        }

        &.big {
          width: 40px;
          height: 40px;
          margin-left: 0px;

          &.white {
            border: 3px solid $blackColor;
          }
        }
      }

      &:after {
        // background-color: #b2d7e833;
        background: #b2d7e8;
        opacity: 0.2;
      }
    }

    .shape {
      &.triangle,
      &.circle,
      &.circle.big,
      &.disc {
        animation-delay: 0.38s;
        animation-duration: 3s;
      }

      &.circle {
        animation-delay: 0.6s;
      }
    }

    &.second {
      left: 485px;
      top: 155px;
      .shape {
        &.triangle,
        &.circle,
        &.circle.big,
        &.disc {
          animation-delay: 1.9s;
        }
        &.circle {
          animation-delay: 2.15s;
        }
      }
    }
  }
}

@keyframes woosh {
  0% {
    width: 12px;
    transform: translate(0px, 0px) rotate(-35deg);
  }
  15% {
    width: 50px;
  }
  30% {
    width: 12px;
    transform: translate(214px, -150px) rotate(-35deg);
  }
  30.1% {
    transform: translate(214px, -150px) rotate(46deg);
  }
  50% {
    width: 110px;
  }
  70% {
    width: 12px;
    transform: translate(500px, 150px) rotate(46deg);
  }
  70.1% {
    transform: translate(500px, 150px) rotate(-37deg);
  }

  85% {
    width: 50px;
  }
  100% {
    width: 12px;
    transform: translate(700px, 0) rotate(-37deg);
  }
}

@keyframes boom-circle {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    transform: scale(3);
  }
  100% {
  }
}

@keyframes boom-triangle-big {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }

  40% {
    opacity: 0;
    transform: scale(2.5) translate(50px, -50px) rotate(360deg);
  }
  100% {
  }
}

@keyframes boom-triangle {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }

  30% {
    opacity: 0;
    transform: scale(3) translate(20px, 40px) rotate(360deg);
  }

  100% {
  }
}

@keyframes boom-disc {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  40% {
    opacity: 0;
    transform: scale(2) translate(-70px, -30px);
  }
  100% {
  }
}

// 5 Letters Loading

// .loading {
//   left: 50%;
//   top: 50%;
//   font-size: 100px;
//   font-family: serif;
//   font-weight: bold;
//   letter-spacing: 20px;
//   text-transform: capitalize;
//   position: absolute;
//   overflow: hidden;
//   transform: translate(-50%, -60%);

//   &:before {
//     color: #ffc107;
//     content: attr(data-loading-text);
//   }

//   &:after {
//     top: 0;
//     left: 0;
//     width: 0;
//     opacity: 1;
//     color: #212529;
//     overflow: hidden;
//     position: absolute;
//     content: attr(data-loading-text);
//     animation: loading 5s infinite;
//   }

//   @keyframes loading {
//     0% {
//       width: 0;
//     }
//     100% {
//       width: 100%;
//     }
//   }
// }
