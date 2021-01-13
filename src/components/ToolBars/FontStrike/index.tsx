import React from 'react'

class FontStrike extends React.Component<any, any> {
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
        const { isActive } = this.state
        const { ToolWrapper } = this.props

        // 按钮使用button, 避免编辑器失去焦点
        return (
            <ToolWrapper active={isActive}>
                <button onClick={this.handleStrike}>
                    <svg viewBox="0 0 1024 1024" width="20" height="20">
                        <path d="M731.904 597.333333c9.813333 22.016 14.762667 46.506667 14.762667 73.386667 0 57.258667-22.357333 102.058667-67.029334 134.272C634.88 837.205333 573.141333 853.333333 494.336 853.333333c-69.973333 0-139.221333-16.256-207.786667-48.810666V708.266667c64.853333 37.418667 131.2 56.149333 199.082667 56.149333 108.842667 0 163.413333-31.232 163.797333-93.738667a94.293333 94.293333 0 0 0-27.648-68.394666l-5.12-4.992H128v-85.333334h768v85.333334h-164.096z m-173.994667-128H325.504a174.336 174.336 0 0 1-20.522667-22.272C286.549333 423.253333 277.333333 394.496 277.333333 360.618667c0-52.736 19.882667-97.578667 59.605334-134.528C376.746667 189.141333 438.229333 170.666667 521.472 170.666667c62.762667 0 122.837333 13.994667 180.138667 41.984v91.818666c-51.2-29.312-107.306667-43.946667-168.362667-43.946666-105.813333 0-158.677333 33.365333-158.677333 100.096 0 17.92 9.301333 33.536 27.904 46.890666 18.602667 13.354667 41.557333 23.978667 68.821333 32 26.453333 7.68 55.338667 17.664 86.613333 29.824z"></path>
                    </svg>
                </button>
            </ToolWrapper>
        )
    }

    handleStrike = () => {
        const { quill } = this.props

        // 编辑器获得焦点
        quill.focus()

        // 获得选中文本范围
        const { index, length } = quill.getSelection()

        const format = quill.getFormat(index, length)

        // 用format可以在selection length为0时生成空白符标签span.ql-cursor,保证样式预设成功
        // formatText则无法避免这个问题
        quill.format('strike', !format.strike)

        this.setState({
            isActive: !format.strike
        })
    }

    editorChangeHandler = () => {
        const { quill } = this.props

        if (quill.getSelection()) {
            const { index, length } = quill.getSelection()
            const format = quill.getFormat(index, length)

            this.setState({
                isActive: format.strike
            })
        }
    }
}

export default FontStrike
