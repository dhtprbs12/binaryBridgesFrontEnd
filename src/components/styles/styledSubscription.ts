import styled from "styled-components";

const StyledSubscription = styled.div`
  .box {
  background-color: #151414;
  padding: 30px;
  text-align: center;
}

.box h1 {
  font-weight: 900;
  margin: 10px 0 0;
}

.box p {
  color: gray;
  margin: 50px;
  font-weight: 300;
  font-size: larger;
}

.box img {
  max-width: 100%;
  width: 400px;
}

.form-control {
  margin: 0 auto;
  width: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input {
  // background-color: black;
  border: 0;
  border-radius: 50px;
  display: block;
  font-family: 'Muli', sans-serif;
  font-size: 14px;
  height: 42px;
  padding: 12px 25px;
  width: 100%;
}

.btn {
  background-color: #872c2c;
  border: 0;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  height: 42px;
  padding: 12px 25px;
  margin-right: 10px;
  position: absolute;
  right: 0;
}

.input:focus, .btn:focus {
  outline: 0;
}

@media screen and (max-width: 480px) {

  .social-panel-container.visible {
    transform: translateX(0px);
  }
}
`;

export default StyledSubscription;

