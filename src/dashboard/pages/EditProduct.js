import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import MainNav from "../../component/MainNav";
import SpinnerData from "../../component/Spinner";
import MainFooter from "../../component/Main-Footer";

function EditProduct() {
  let params = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [singleProduct, setSingleProduct] = useState({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error retrieving product data:", error);
        setIsLoading(false);
      });
  }, [params.productId]);

  const formatSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://fakestoreapi.com/products/${params.productId}`, {
        title: title || singleProduct.title,
        price: price || singleProduct.price,
        description: description || singleProduct.description,
        category: category || singleProduct.category,
        image: image || singleProduct.image,
      })
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error retrieving product data:", error);
      });
  };

  return (
    <main>
      {isLoading ? (
        <SpinnerData />
      ) : (
        <>
          <MainNav />
          <section className="breadcrumb-section py-3">
            <Container>
              <h1 className=" main-head text-uppercase text-center">
                Edit product
              </h1>
              <Breadcrumb>
                <Breadcrumb.Item active>
                  <Link
                    className="text-decoration-underline text-black"
                    to={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Edit product</Breadcrumb.Item>
                <Breadcrumb.Item active>{singleProduct.title}</Breadcrumb.Item>
              </Breadcrumb>
            </Container>
          </section>

          <section className="editProduct my-5">
            <Container>
              <Form className="editProduct-form" onSubmit={formatSubmit}>
                <Form.Group
                  className="form__title mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    defaultValue={singleProduct.title}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="form__price mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Product Price in Dollar</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="any"
                    onChange={(e) => setPrice(e.target.value)}
                    defaultValue={singleProduct.price}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="form__description mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={singleProduct.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="form__category mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={singleProduct.category}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="form__image mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Product Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    defaultValue={singleProduct.image}
                    required
                  />
                </Form.Group>

                <Row className="form__submit-btn mx-0">
                  <Col xs={12} sm={4} className="ps-0">
                    <Button className="w-100" variant="primary" type="submit">
                      Confirm
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </section>
          <MainFooter />
        </>
      )}
    </main>
  );
}
export default EditProduct;
