import React, {Component } from 'react'
import Gallery from 'react-photo-gallery'
import Photo from './Photo'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import Lightbox from 'react-images'

const photos = [
  { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
  { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
]

const SortablePhoto = SortableElement(Photo)
const SortableGallery = SortableContainer(({photos}) => {
  return <Gallery photos={photos} ImageComponent={SortablePhoto}/>
})

export default class PhotoGallery extends Component {

  constructor(){
    super()
    this.state = {
      photos: photos,
      currentImage: 0
    }
    this.onSortEnd = this.onSortEnd.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex),
    })
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
      <SortableGallery axis={"xy"} photos={this.state.photos} onSortEnd={this.onSortEnd} />
      <Lightbox images={photos}
        onClose={this.closeLightbox}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        currentImage={this.state.currentImage}
        isOpen={this.state.lightboxIsOpen}
      />
    )
  }

}
