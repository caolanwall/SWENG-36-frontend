import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class PDFView extends Component {
  state = { numPages: null, pageNumber: 1, file:null };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  fileDownloadHandler = () => {
      const data = new FormData()
      data.append('file', this.state.selectedFile)
      axios.get("http://localhost:5001/files/5e94e85d85e48d58b7af1890", data, {
          // receive two parameter endpoint url, form data
      })
          .then(res => { // then print response status
              console.log(res.statusText)
          })
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file={this.props.location.docName}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
export default PDFView
