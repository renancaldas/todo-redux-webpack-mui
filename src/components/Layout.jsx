import React from 'react';

// Material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import { blue500, blue700, pinkA200, grey100, grey300, grey400, grey500,
         white, darkBlack, fullBlack } from 'material-ui/styles/colors';

// Internal components
import Header from './Header';
import Todo from '../todo/Todo';

// Material-ui definitions
injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});

/*
export default function Layout() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header title="To do list" />
        <Todo />
      </div>
    </MuiThemeProvider>
  );
}
*/

export default () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Header title="To do list" />
      <Todo />
    </div>
  </MuiThemeProvider>
);
