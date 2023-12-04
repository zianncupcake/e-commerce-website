import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";
import {Row, Container} from 'react-bootstrap'

const HomePage = () => {
    const dummyCategories = [
        'Tablets',
        'Monitors',
        'Games',
        'Printers',
        'Software',
        'Cameras',
        'Books',
        'Videos',

    ]
    return (
        <>
        <ProductCarouselComponent />
        <Container>
            <Row xs={1} md={2} className="g-4 mt-5">
                {dummyCategories.map((category, idx) => <CategoryCardComponent category={category} idx={idx} />)}
            </Row>
        </Container>
        </>
        )
    }

export default HomePage