import React from 'react'

class Redo extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            disabled: true
        }
    }

    componentDidMount() {
        // 监听编辑器历史堆栈变化, 开启/禁用重做按钮
        this.props.quill.on('text-change', this.textChangeHandler)
    }

    componentWillUnmount() {
        this.props.quill.off('text-change', this.textChangeHandler)
    }

    render() {
        const { disabled } = this.state
        const { ToolWrapper } = this.props

        return (
            <ToolWrapper disabled={disabled}>
                <button onClick={this.handleRedo}>
                    <svg viewBox="0 0 1024 1024" width="20" height="20">
                        <path d="M737.9968 256l-55.6032-55.6032A51.2 51.2 0 1 1 754.8416 128l144.7936 144.7936a51.2 51.2 0 0 1 0 72.448L754.8416 489.984a51.2 51.2 0 0 1-72.448-72.3968L741.632 358.4H409.6a204.8 204.8 0 1 0 0 409.6h409.6a51.2 51.2 0 0 1 0 102.4H409.6A307.2 307.2 0 1 1 409.6 256h328.3968z"></path>
                    </svg>
                </button>
            </ToolWrapper>
        )
    }

    handleRedo = () => {
        // 编辑器获得焦点
        this.props.quill.focus()
        this.props.quill.history.redo()
    }

    textChangeHandler = () => {
        const redoStack = this.props.quill.history?.stack?.redo
        const isDisabled = !redoStack || redoStack.length <= 0

        if (isDisabled !== this.state.disabled) {
            this.setState({
                disabled: isDisabled
            })
        }
    }
}

export default Redo
