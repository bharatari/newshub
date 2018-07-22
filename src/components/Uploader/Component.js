import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Upload, Icon, message, Button } from 'antd';
import classes from './Styles.scss';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class Uploader extends React.Component {
  state = {
    file: null,
    onSuccess: null,
    onError: null,
  };
  customRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) => {
    const formData = new FormData();

    if (data) {
      Object.keys(data).map(key => {
        formData.append(key, data[key]);
      });
    }

    formData.append(filename, file);

    this.props.uploadFile(formData);

    this.setState({
      file,
      onSuccess,
      onError,
    });
    
    return {
      abort() {
        console.log('Upload progress is aborted.');
      },
    };
  };
  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2 MB.');
    }

    return isLt2M;
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });

      return;
    }

    if (info.file.status === 'done') {
      const imageUrl = info.file.response.url;

      this.setState({
        imageUrl,
        loading: false,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.onSuccess && this.state.onError) {
      if (this.props.file.requesting && !nextProps.file.requesting) {
        if (nextProps.file.file) {
          this.state.onSuccess(nextProps.file.file, this.state.file);

          const value = nextProps.file.file.url;

          this.props.input.onChange(value);
          this.props.input.onFocus(value);
          this.props.input.onBlur(value);
        } else {
          message.error('Whoops! Something went wrong there, check your file type and file size and try again.');

          this.props.onError(nextProps.file.error);
        }

        this.setState({
          file: null,
          onSuccess: null,
          onError: null,
        });
      }
    }
  }
  handleDelete = () => {
    this.setState({
      imageUrl: null,
    });
  };
  render() {
    const uploadButton = (
      <div>
        <p className="ant-upload-drag-icon">
          <Icon type={this.state.loading ? 'loading' : 'inbox'} />
        </p>
        <div className="ant-upload-text">Click or drag image to this area to upload</div>
        <p className="ant-upload-hint">Square images work best</p>
      </div>
    );

    const imageUrl = this.state.imageUrl;

    const image = (
      <div>
        <img height="300" src={imageUrl} />
      </div>
    );

    const actions = (
      <div className={classes.actions}>
        <Button onClick={this.handleDelete} type="danger" icon="delete">Delete Image</Button>
      </div>
    );
    
    return (
      <div>
        <Upload.Dragger
          name={this.props.uploadFieldName}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={this.customRequest}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}>
          { imageUrl ? image : uploadButton }
        </Upload.Dragger>
        { imageUrl ? actions: null }
      </div>
    );
  }
}
