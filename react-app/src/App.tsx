import { Heading } from "./libs/Heading"
import { Text } from "./libs/Text"

export const App = () => {
    return (
        <>
            <Text text="true" />
            <Heading tag="h1">見出し</Heading>
            <Heading tag="h1">
            <span>hello, world!</span>
            </Heading>
        </>
    )
}