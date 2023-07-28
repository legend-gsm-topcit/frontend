import { styled } from "styled-components";

export const words = styled.div`
  background-color: #c4c4c473;
  position: absolute;
  /* top: 0; */
  /* left: 0; */
  width: 1000px;
  height: 740px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 25px;
  .word{
    background-color: white;
    border: 1px solid black;
    padding: 10px 20px;
    cursor: pointer;
    & + div{
      margin-left: 20px;
    }
    &:hover{
      background-color: lightgray;
    }
  }
  .active{
    background-attachment: lightgray;
    border: 1px solid black;
    padding: 10px 20px;
    cursor: pointer;
    & + div{
      margin-left: 20px;
    }
  }
`