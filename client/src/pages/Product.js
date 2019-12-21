import React from "react";
import {getById} from "../api/products";
import {addToCart} from "../store/actions/actions";
import {connect} from "react-redux";


class Product extends React.Component{
    state={
        loading: true,
        quantity: 0,
        product: {}
    };

   
    componentDidMount(){
        const id = this.props.match.params.id;

        getById(parseInt(id))
            .then(product => {
                this.setState({
                    product,
                    loading: false
                });
            })
    }
    handleQuantity = (event) => {
        const value = event.target.value;
        if(value < 0)
         return;
        this.setState({
            quantity: event.target.value
        })

    }
    addToCart = (product) => {
        this.props.addToCart(product, this.state.quantity);

    }
    render() {
        if(this.state.loading)
          return 'loading ..';
        const product = this.state.product;
        const quantity = this.state.quantity;
    return (
        <div> 
    
    <div className = {'row'}>
        <div className = 'col-6'>
        <img src= {product.image}  width={'100%'}/>
        </div>
        <div className = "col-6">
        <h1>{product.name}</h1>

        <p>Price: {product.price}$</p>

        <p>{product.description}</p>
        <input type="number" value={quantity} onChange={this.handleQuantity} />           
        <br /><br />
        <p>Total: {quantity * product.price}</p>
        <button className = "btn btn-primary"  onClick={() => this.addToCart(product)}> Add To Cart</button>
                            </div>
                  </div>
            </div>
    );
}
}
const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (productInfo, quantity) => dispatch(addToCart(productInfo, quantity))

    };
}

export default connect(null, mapDispatchToProps)(Product);