# The Task

* Read the users from the xml, csv and json files within the `data` directory.
* Merge all users into a single list and sort them by their `userId` in ascending order.
* Write the ordered results to new xml, csv and json files. See the `examples` directory for examples.
  * Results should use the same structure as the source files they were parsed from.
  * The exception is for `lastLoginTime` where an `ISO 8601` date format is preferred for output.


# Requirements

* Use an Object Oriented language of your prefererence.
* Please provide a solution that best showcases your OO design abilities and is representative of how you would work.
* Please document the decisions you made while solving this task (taking shortcuts is okay if they are justified and explained).
* Please make a note of what you skipped or didn't implement and why.

# Evaluation

* The main 3 evaluation criteria will be: 
    * OO design/principles
    * Code reuse and duplication
    * Tests

# Submitting your solution

Please don't fork the repo, as your solution will be public.

Either:
* Zip up your solution (omitting the vendor folder)
* After committing your changes, create a git bundle from your local repo with:
```
git bundle create solution.bundle master
```

Submit your solution via email
