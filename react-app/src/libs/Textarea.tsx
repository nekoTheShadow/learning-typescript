import { ChangeEvent, useState, VFC } from "react"
import styled, { css } from "styled-components"
import { space, radius, color, fontSize } from "./constants"

type Props = {
    width?: number,
    maxLength?: number,
}

const Wrapper = styled.textarea<{width: number}>`
    height: 120px;
    padding: ${space.m};
    border-radius: ${radius.m};
    border: solid 1px ${color.gray};
    font-size: ${fontSize.m};
    ${props => css`width: ${props.width}px;`}
    &.error {
        border: solid 1px ${color.red};
    }
`

const Count = styled.p`
    margin: 0;
    font-size: ${fontSize.m};
    &.error {
        color: ${color.red};
    }
`

export const Textarea: VFC<Props> = ({maxLength, width=300}) => {
    const [count, setCount] = useState<number>(0)
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setCount(event.currentTarget.value.length)
    const isError = () => (maxLength !== undefined && maxLength - count < 0)
    return (
        <>
            <Wrapper width={width} onChange={handleChange} className={isError() ? 'error' : ''} />
            {maxLength !== undefined && (<Count className={isError() ? 'error' : ''}>残り{Math.max(maxLength-count, 0)}文字です</Count>)}
        </>
    )
}