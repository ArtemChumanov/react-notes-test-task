import { DefaultTheme } from "styled-components";
import {
  _black,
  _blackGradient,
  _blueGradient,
  _blueSidebar,
  _darkBlue,
  _lightBlue,
  _middleBlack,
  _red,
  _white,
  _yellow,
} from "../utils/constants";

export const AppTheme: DefaultTheme = {
  colors: {
    black: _black,
    white: _white,
    yellow: _yellow,
    red: _red,
  },
  backgrounds: {
    lightBlack: _blackGradient,
    sidebarBackground: _blueSidebar,
    lightBlue: _lightBlue,
    gradientBlue: _blueGradient,
    middleBlack: _middleBlack,
    darkBlue: _darkBlue,
  },
};
