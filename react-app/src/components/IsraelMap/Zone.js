import React from 'react';

import './Zone.css';
import { Placeholder } from 'react-bootstrap';

function Zone(props) {
  const { filteredList, onClick, isLoading } = props;
  return (
    <div className="scroll-list">
      {!isLoading ? (
        filteredList.map((item, index) => (
          <div
            key={index}
            className="list-item"
            onClick={() => {
              onClick(item.xAxis, item.yAxis, item._id);
            }}
          >
            <a
              href="#israelmap"
              style={{ display: 'contents', color: 'black' }}
            >
              <div>
                <div className="item-image">
                  <img src={item.image_url} alt={item.map} />
                </div>
              </div>
              <div className="item-details">
                {item.title}
                <p className="text">{item.description}</p>
              </div>
            </a>
          </div>
        ))
      ) : (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="list-item">
              <div>
                <div className="item-image">
                  <Placeholder as="image" animation="glow">
                    <Placeholder
                      xs={8}
                      style={{
                        boxSizing: 'border-box',
                        backgroundColor: 'gray',
                        maxWidth: '100%',
                        width: '80%',
                        height: '68%',
                      }}
                    />
                  </Placeholder>
                </div>
              </div>
              <div className="item-details">
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={8} />
                </Placeholder>
                <div className="text">
                  <Placeholder as="p" animation="glow">
                    <Placeholder xs={12} />
                    <Placeholder xs={5} />
                  </Placeholder>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Zone;
