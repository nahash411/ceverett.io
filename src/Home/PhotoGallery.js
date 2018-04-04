import React, { Component } from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import SelectedImage from './SelectedImage'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import axios from 'axios'

let categories = []

let photos = []

export default class PhotoGallery extends Component {

  constructor(){
    super()
    this.state = {
      photos: photos,
      currentImage: 0,
      categories: categories
    }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.selectPhoto = this.selectPhoto.bind(this)
    this.toggleSelect = this.toggleSelect.bind(this)
  }

  componentWillMount() {
    axios.get('http://localhost:3000/categories')
      .then((res) => {
        categories = res.data
        axios.get('http://localhost:3000/photos/uncategorized')
          .then((resp) => {
            photos = resp.data
            this.setState({ photos, categories })
          })
      })
  }

  selectPhoto(event, obj) {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }

  toggleSelect() {
    let photos = this.state.photos.map((photo, index) => { return { ...photo, selected: !this.state.selectAll } });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    return (
      <div className="gallery">
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            {this.state.categories.map((category) => {
              return <option value={category} key={category}>{category}</option>
            })}
          </FormControl>
        </FormGroup>
        <Gallery photos={this.state.photos} onClick={this.selectPhoto} ImageComponent={SelectedImage}/>
        <Lightbox images={this.state.photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }

}
