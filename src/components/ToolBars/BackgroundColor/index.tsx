import React from 'react'
import Dropdown from '@components/Dropdown'
import ColorPicker from '@components/ColorPicker'
import styles from './index.less'

class BackgroundColor extends React.Component<any, any> {
    private dropdown: any

    constructor(props: any) {
        super(props)

        this.state = {
            currentColor: null
        }
    }

    render() {
        const { currentColor } = this.state

        return (
            <Dropdown
                ToolWrapper={this.props.ToolWrapper}
                onRef={(dropdown: any) => (this.dropdown = dropdown)}
                content={<ColorPicker onChange={this.handleColorChange} />}
            >
                <div className={styles['background-color']}>
                    <svg viewBox="0 0 1024 1024" width="18" height="18" onClick={this.handleBackgroundColor}>
                        <path d="M260.376 617.741c-9.641 9.362-14.46 22.46-14.46 39.31 0 14.791 5.24 26.861 15.726 36.223 10.479 9.36 24.331 14.037 41.557 14.037 23.961 0 43.705-8.422 59.245-25.27s23.309-37.999 23.309-63.455v-29.77l-72.727 9.827c-25.462 3.373-43.008 9.737-52.65 19.098zM829.005 92.92H190.046c-70.58 0-127.791 57.212-127.791 127.792v575.063c0 70.58 57.212 127.792 127.791 127.792h638.959c70.58 0 127.791-57.212 127.791-127.792V220.711c0.001-70.58-57.212-127.792-127.791-127.792z m-388.78 651.739h-54.472v-48.019h-1.406C362.82 733.52 331.09 751.96 289.16 751.96c-30.146 0-54.1-8.146-71.883-24.433-17.789-16.281-26.677-38.28-26.677-65.985 0-58.024 34.35-91.818 103.051-101.365l92.1-12.919c0-50.727-20.971-76.094-62.9-76.094-37.251 0-71.231 12.543-101.926 37.628V455.72c30.887-19.277 66.547-28.92 106.98-28.92 74.873 0 112.316 39.31 112.316 117.934v199.924z m344.392-39.17c-25.737 30.983-60.044 46.472-102.91 46.472-40.434 0-71.226-17.035-92.382-51.104H588.2v43.8h-55.033V285.004H588.2v202.73h1.125c24.331-40.62 59.902-60.931 106.7-60.931 38.938 0 69.87 13.712 92.803 41.135 22.932 27.425 34.401 64.912 34.401 112.458 0 52.412-12.875 94.111-38.612 125.094z m-103.754-233.2c-26.95 0-49.187 9.642-66.688 28.92-17.5 19.284-26.249 43.807-26.249 73.57v42.12c0 25.085 8.14 46.286 24.428 63.596 16.287 17.322 36.688 25.973 61.212 25.973 29.2 0 52.037-11.227 68.515-33.692 16.466-22.466 24.709-53.533 24.709-93.225 0-32.752-7.68-58.822-23.029-78.202-15.347-19.373-36.318-29.06-62.898-29.06z"></path>
                    </svg>

                    <div className={styles['color-val']} style={{ background: currentColor }}></div>
                </div>
            </Dropdown>
        )
    }

    handleColorChange = (color: string) => {
        this.setState(
            {
                currentColor: color
            },
            () => {
                this.handleBackgroundColor()
            }
        )

        // 调用Dropdown组件方法
        this.dropdown.handleVisibleChange(false)
    }

    handleBackgroundColor = () => {
        const { currentColor } = this.state
        const { quill } = this.props

        quill.focus()

        if (quill.getSelection()) {
            quill.format('background', currentColor ? currentColor : false)
        }
    }
}

export default BackgroundColor
