import { Text, Link } from "@chakra-ui/react";

function TextWithLink({ firstSentence, handleAlready, lastWord }) {
  return (
    <Text>
      {firstSentence}{" "}
      <Link onClick={() => handleAlready((prev) => !prev)} color={"blue.500"}>
        {lastWord}
      </Link>
    </Text>
  );
}

export default TextWithLink;
