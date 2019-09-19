import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class BookList extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	static propTypes = {
		getItems: PropTypes.func.isRequired,
		item: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool
	};

	onDeleteClick = id => {
		this.props.deleteItem(id);
	};
	render() {
    const { items } = this.props.item;
    const authList = (
      <Fragment>
        <ListGroup>
					<TransitionGroup className="book-list">
						{items.map(({ _id, name }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
								
										<Button
											className="remove-btn"
											color="danger"
											size="sm"
											onClick={this.onDeleteClick.bind(this, _id)}
										>
											&times;
										</Button>

									{name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
      </Fragment>
    )

		return (
			<Container>
					{this.props.isAuthenticated ? authList : null}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem }
)(BookList);
