import React from 'react';
import { Link, graphql } from 'gatsby'
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import Chip from '@mui/material/Chip';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {`${dataSet[1]}`}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

function random(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});
  

function TreeMenu(props) {
    const { items, setItems, resetItems, origItems, styles } = props;

    const options = items.map((player) => player.name).sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const setStyle = (style) => {
        setAnchorEl(null);
        // resetItems();
        setItems(origItems.filter((item) => {
            console.log(item);
            return item?.styles?.some((val, idx) => val.slug === style);
        }));
    };

    return (
        <div style={{ position: "absolute", top: "100px", right: "100px", zIndex: "9999" }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                sx={{ width: 300 }}
            >
                <MenuItem>
                    <Autocomplete
                        id="virtualize-demo"
                        sx={{ width: 300 }}
                        disableListWrap
                        PopperComponent={StyledPopper}
                        ListboxComponent={ListboxComponent}
                        options={options}
                        groupBy={(option) => option[0].toUpperCase()}
                        renderInput={(params) => <TextField {...params} label="Search the tree..." />}
                        renderOption={(props, option, state) => [props, option, state.index]}
                        // TODO: Post React 18 update - validate this conversion, look like a hidden bug
                        renderGroup={(params) => params}
                    />
                </MenuItem>
                <MenuItem sx={{ flexWrap: "wrap" }}>
                  { styles && styles.length && styles.map((style, idx) => (
                    <Chip key={style.slug} onClick={() => setStyle(style.slug)} size="small" label={style.name} style={{ fontSize: '12px', color: '#ffffff', marginRight: "5px", marginBottom: "3px", backgroundColor: style.colour.value}} />
                  ))}
                    
                </MenuItem>

                <MenuItem onClick={() => resetItems()}>
                    Reset
                </MenuItem>
            </Menu>
        </div>
    )
}

export default TreeMenu;