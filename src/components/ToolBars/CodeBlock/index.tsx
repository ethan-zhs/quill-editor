import React from 'react'

class Code extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            isActive: false
        }
    }

    componentDidMount() {
        this.props.quill.on('selection-change', this.editorChangeHandler)
        this.props.quill.on('text-change', this.editorChangeHandler)
    }

    componentWillUnmount() {
        this.props.quill.off('selection-change', this.editorChangeHandler)
        this.props.quill.off('text-change', this.editorChangeHandler)
    }

    render() {
        const { ToolWrapper } = this.props

        // 按钮使用button, 避免编辑器失去焦点
        return (
            <ToolWrapper active={this.state.isActive}>
                <button onClick={this.handleCodeBlock}>
                    <svg className="rql-svg-icon" viewBox="0 0 1027 1024" width="20" height="20">
                        <path d="M321.828571 226.742857c-14.628571-14.628571-36.571429-14.628571-51.2 0L7.314286 482.742857c-14.628571 14.628571-14.628571 36.571429 0 51.2l256 256c14.628571 14.628571 36.571429 14.628571 51.2 0 14.628571-14.628571 14.628571-36.571429 0-51.2L87.771429 512l234.057142-234.057143c7.314286-14.628571 7.314286-36.571429 0-51.2z m263.314286 0c-14.628571 0-36.571429 7.314286-43.885714 29.257143l-131.657143 497.371429c-7.314286 21.942857 7.314286 36.571429 29.257143 43.885714s36.571429-7.314286 43.885714-29.257143l131.657143-497.371429c7.314286-14.628571-7.314286-36.571429-29.257143-43.885714z m431.542857 256l-256-256c-14.628571-14.628571-36.571429-14.628571-51.2 0-14.628571 14.628571-14.628571 36.571429 0 51.2L936.228571 512l-234.057142 234.057143c-14.628571 14.628571-14.628571 36.571429 0 51.2 14.628571 14.628571 36.571429 14.628571 51.2 0l256-256c14.628571-14.628571 14.628571-43.885714 7.314285-58.514286z"></path>
                    </svg>
                </button>
            </ToolWrapper>
        )
    }

    handleCodeBlock = () => {
        const { quill } = this.props

        // 编辑器获得焦点
        quill.focus()

        // 获得选中文本范围
        const { index, length } = quill.getSelection()

        // 获得当前格式
        const format = quill.getFormat(index, length)

        quill.format('code-block', !format['code-block'])
    }

    editorChangeHandler = () => {
        const { quill } = this.props

        if (quill.getSelection()) {
            const { index, length } = quill.getSelection()
            const format = quill.getFormat(index, length)

            this.setState({
                isActive: format['code-block']
            })
        }
    }
}

export default Code
