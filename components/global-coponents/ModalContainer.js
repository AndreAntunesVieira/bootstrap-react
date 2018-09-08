import React from 'react'
import { connect } from 'react-redux'

function ModalContainer({ showModal }){
  if(!showModal) return null
  return (
    <div className="modalContainer">
      asdasld use component...
    </div>
  )
}

export default connect(store => ({
  showModal: store.modal.show,
}))(ModalContainer)
