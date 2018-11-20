import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  secondary: {
    marginBottom: 12,
    fontSize : 11,
  },
};
class PriceCard extends Component {

    render(){
            return (
                <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.pricing.name}
                    </Typography>
                    <Typography className={this.props.classes.secondary} color="textSecondary">
                    {this.props.pricing.description}
                    </Typography>
                    <Typography variant="h6" component="p">
                    ${this.props.pricing.price} per month
                    </Typography>
                    <Typography variant="h6" component="p">
                    {this.props.pricing.accounts} accounts
                    </Typography>
                    <Typography variant="h6" component="p">
                    {this.props.pricing.support} support
                    </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
                </Card>
            );
    }
}

PriceCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(PriceCard);