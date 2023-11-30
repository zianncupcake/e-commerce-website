import {useParams} from 'react-router-dom';

const ProductDetailsPage = () => {
    const {id} = useParams();
    return <p>this is a ProductDetailsPage</p>
}

export default ProductDetailsPage