﻿import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import PhotoFrame from '../photos/PhotoFrame';
import * as apiClient from "../helpers/ApiHelpers";

const PhotoDetails = () => {
  const { albumId: albumIdParam, photoId: photoIdParam } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photoId, setPhotoId] = useState(Number(photoIdParam));
  const [albumId, setAlbumId] = useState(Number(albumIdParam));
  const [albumCaption, setAlbumCaption] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchPhotos = async (id) => {
      if (id === 0) {
        try {
          const response = await apiClient.getHelper('api/photodetails/savedphotoid');
          const randomPhotoId = Number(response);
          setPhotoId(randomPhotoId);
          getAllPhotosInAlbumWithSavedPhotoId();
        } catch (error) {
          alert('Could not contact server ' + error);
        }
      } else {
        try {
          setPhotoId(id);
          const response = await apiClient.getHelper(`/api/photodetails/${albumId}`);
          if (response.length) {
            const { albumID } = response[0];
            setAlbumId(albumID);

            const albums = await apiClient.getHelper('api/albums');
            const album = albums.find(({ albumID: id }) => id === albumID);
            setAlbumCaption(album?.caption || 'No caption available');
          }

          setPhotos([...response]);
        } catch (error) {
          alert('Could not contact server ' + error);
        }
      }
    };

    const getAllPhotosInAlbumWithSavedPhotoId = async () => {
      try {
        const response = await apiClient.getHelper('api/photodetails/0');
        if (response.length) {
          const { albumID } = response[0];
          setAlbumId(albumID);

          const albums = await apiClient.getHelper('api/albums');
          const album = albums.find(({ albumID: id }) => id === albumID);
          setAlbumCaption(album?.caption || 'No caption available');
        }

        setPhotos([...response]);
      } catch (error) {
        alert(`Could not contact server: ${error.message}`);
      }
    };

    fetchPhotos(Number(photoIdParam));
  }, [photoIdParam, albumIdParam]);

  const setPhotoDetailsRoute = (e, photoId) => {
    e.preventDefault();
    history.push(`/photodetails/${photoId}/${albumId}`);
  };

  const getPhotoNumber = (pid) => {
    const photo = photos.find(p => p.photoID === pid);
    return photo ? photos.indexOf(photo) + 1 : 0;
  };

  const photoNumber = getPhotoNumber(photoId);

  if (photos.length === 0) return <div />;

  const first = photos[0].photoID;
  const last = photos[photos.length - 1].photoID;
  const prev = photoNumber > 1 ? photos[photoNumber - 2].photoID : first;
  const next = photoNumber < photos.length ? photos[photoNumber].photoID : last;

  const clickList = photos.map((photo, index) => (
    <div key={photo.photoID} style={{ display: 'inline' }}>
      {index + 1 !== photoNumber ? (
        <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, photo.photoID)}>{index + 1}</Link>
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  ));

  return (
    <div className="container container-fluid">
      <Row>
        <Col className="row-height">
          <Col md={3} className="hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
            <Row>
              <Col md={12}>
                <h4>{albumCaption}</h4>
              </Col>
            </Row>
          </Col>
          <Col md={9} sm={9} xs={9} className="col-md-height">
            <Row>
              <div className="buttonbar buttonbar-top">
                <Col lg={2} md={2} sm={2} xs={2} />
                <Col lg={3} md={3} sm={3} xs={3}>
                  <Link to="/albums">
                    <img id="FormView1_Image1" src="/images/button-gallery.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link> &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, first)}>
                    <img src="/images/button-first.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, prev)}>
                    <img src="/images/button-prev.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, next)}>
                    <img src="/images/button-next.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, last)}>
                    <img src="/images/button-last.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                </Col>
                <Col lg={7} md={7} sm={7} xs={7} />
              </div>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <table className="view" cellSpacing="0" cellPadding="0" id="FormView1" style={{ borderCollapse: 'collapse', borderStyle: 'None', borderWidth: '0px' }}>
                  <tbody>
                    <tr>
                      <td>
                        <p>{photos[photoNumber > 0 ? photoNumber - 1 : 0].caption}</p>
                        <PhotoFrame>
                          <img src={`/RandomHandler/Index/PhotoID=${photoId}/Size=L`} className="photo_198" style={{ border: '4px solid white', objectFit: 'contain', minHeight: '500px', maxHeight: '500px', top: '50%', bottom: '50%' }} alt={`PhotoID ${photoId}`} />
                        </PhotoFrame>
                        <p>
                          <a href={`/RandomHandler/Download/${photoId}/Size=L`}>
                            <img src="/images/button-download.gif" alt="download" />
                          </a>
                        </p>
                      </td>
                      <td style={{ width: '500px' }} />
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
            <Row>
              <div className="buttonbar buttonbar-bottom">
                <Col md={4} sm={3} xs={2}>{clickList}</Col>
                <Col md={3} sm={3} xs={3}>
                  <Link to="/albums">
                    <img id="FormView1_Image2" src="/images/button-gallery.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link> &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, first)}>
                    <img src="/images/button-first.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, prev)}>
                    <img src="/images/button-prev.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, next)}>
                    <img src="/images/button-next.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                  <Link to="#" onClick={(e) => setPhotoDetailsRoute(e, last)}>
                    <img src="/images/button-last.gif" style={{ borderWidth: '0px' }} alt="" />
                  </Link>
                </Col>
                <Col md={5} sm={6} xs={7} />
              </div>
            </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default PhotoDetails;
