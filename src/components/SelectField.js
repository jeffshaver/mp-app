import ImmutablePropTypes from 'react-immutable-proptypes'
import {List} from 'immutable'
import MaterialSelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import React, {PropTypes} from 'react'

const SelectField = ({
  data,
  keyKey,
  label,
  style,
  textKey,
  underlineStyle,
  value,
  valueKey,
  onItemTouchTap
}) => {
  return (
    <MaterialSelectField
      floatingLabelText={label}
      style={style}
      underlineStyle={underlineStyle}
      value={value}
    >
      {
        data.map((data) => {
          return (
            <MenuItem
              key={data.get(keyKey)}
              primaryText={data.get(textKey)}
              value={data.get(valueKey)}
              onTouchTap={() => onItemTouchTap(data)}
            />
          )
        })
      }
    </MaterialSelectField>
  )
}

SelectField.propTypes = {
  data: ImmutablePropTypes.list,
  keyKey: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  textKey: PropTypes.string,
  underlineStyle: PropTypes.object,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  onItemTouchTap: PropTypes.func
}

SelectField.defaultProps = {
  data: List(),
  keyKey: 'id',
  valueKey: 'id',
  onItemTouchTap: () => {}
}

export default SelectField