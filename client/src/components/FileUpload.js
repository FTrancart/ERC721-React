import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import Web3 from 'web3';
import axios from 'axios';
import erc721 from '../build/contracts/ERC721.json';
import contract from 'truffle-contract';
import $ from 'jquery';

const FileUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const loadContract = async web3 => {
    var web3 = new Web3(window.ethereum);
    var _contract = contract(erc721);
    _contract.setProvider(web3.currentProvider); 
    var instance = await _contract.deployed();
    const ad = await web3.currentProvider.selectedAddress;
    await instance.buyToken({from : ad, value : 100000000000000000});
    const res = await instance.getTotalToken.call();
    setMessage("New token minted to account has id " + res);
    return res;
  }

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const id = await loadContract();
    const formData = new FormData();
    formData.append('file', file, 'token' + id + '.png' );

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('Token logo Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
    {message ? <Message msg={message} /> : null}
    <form onSubmit={onSubmit}>
    <div className='custom-file mb-4'>
    <input
    type='file'
    className='custom-file-input'
    id='customFile'
    onChange={onChange}
    />
    <label className='custom-file-label' htmlFor='customFile'>
    {filename}
    </label>
    </div>

    <Progress percentage={uploadPercentage} />

    <input
    type='submit'
    value='Confirm transfer'
    className='btn btn-primary btn-block mt-4'
    />
    </form>
    {uploadedFile ? (
      <div className='row mt-5'>
      <div className='col-md-6 m-auto'>
      <h3 className='text-center'>{uploadedFile.fileName}</h3>
      <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
      </div>
      </div>
      ) : null}
      </Fragment>
      );
    };

    export default FileUpload;
