import LinkNext from 'next/link';

export const Link = (props) => {
  const {path} = props;
  return (
    <LinkNext {...props} href={path}>
      {props.children}
    </LinkNext>
  );
};

export const LinkDefaultProps = {};

Link.craft = {
  displayName: 'Link',
  props: LinkDefaultProps,
};
