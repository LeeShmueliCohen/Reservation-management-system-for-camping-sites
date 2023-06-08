import { Modal, Carousel } from 'react-bootstrap';

function ItemImages({ images, show, onHide }) {
  console.log('images', images);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Carousel>
          {images &&
            Object.keys(images).map((key) => (
              <Carousel.Item key={key}>
                <img
                  className="d-block w-100"
                  src={images[key].url}
                  alt={key}
                />
              </Carousel.Item>
            ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
}

export default ItemImages;
