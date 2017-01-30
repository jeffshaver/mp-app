import Card, {CardActions, CardText} from 'material-ui/Card'
import React, {PropTypes} from 'react'

const defaultStyle = {
  card: {
    margin: '2rem auto',
    width: '90%'
  },
  container: {
    padding: '0'
  },
  text: {
    padding: '0 16px 16px 16px'
  }
}

const CardWrapper = ({actions, children, style = {}}) => {
  return (
    <Card
      containerStyle={{...defaultStyle.container, ...style.container}}
      style={{...defaultStyle.card, ...style.card}}
    >
      <CardText style={{...defaultStyle.text, ...style.text}}>
        {children}
      </CardText>
      {
        actions !== undefined
          ? (
            <CardActions>
              {actions}
            </CardActions>
          )
          : null
      }
    </Card>
  )
}

CardWrapper.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  style: PropTypes.object
}

export default CardWrapper