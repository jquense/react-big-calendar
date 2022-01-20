# Documentation Contributions

We utilize [Storybook](https://storybook.js.org) for documenting Big Calendar, as well as seeing the effects of our changes to source code in real time during development.

You will notice that we use the [With MDX documentation](https://storybook.js.org/docs/react/writing-docs/docs-page#with-mdx-documentation) approach for our `props` documentation, but use both a `js` and an `mdx` file for each prop. There is valid reasoning for this. Storybook's 'Canvas' view shows a single 'story' from navigation within a section, whereas it's 'Docs' view may show multiple entries within a section.

We have attempted to include an implementation example with each prop. While MDX documentation does allow us to include multiple Stories, the rendering of multiple Big Calendar implementations in that view (especially in light of the number of props available) would have negative effects on rendering the documentation.

Previous documentation was built using the jsDocs metadata in the Calendar component. Since we wanted to expand our documentation, and include examples of each prop's usage, this was no longer a viable path.

TODO:

- [ ] `backgroundEventPropGetter` - props (not currently implemented. skipping it)
- [ ] `onShowMoreDrillDown` - props (not currently implemented. skipping it)
- [ ] Can we write true unit testing with SB and React Testing Library?
