import java.util.HashSet;
import java.util.Set;

/**
 * LeetCode 128 - Longest Consecutive Sequence
 *
 * Given an unsorted array of integers nums, return the length of the longest
 * consecutive elements sequence. The algorithm must run in O(n) time.
 *
 * Example 1: nums = [100,4,200,1,3,2]       -> 4  (sequence: 1,2,3,4)
 * Example 2: nums = [0,3,7,2,5,8,4,6,0,1]   -> 9  (sequence: 0-8)
 * Example 3: nums = []                       -> 0
 *
 * Approach:
 *   1. Insert every number into a HashSet for O(1) lookups.
 *   2. For each number, check if it is the *start* of a sequence
 *      (i.e. num-1 is NOT in the set).
 *   3. If it is, count consecutive numbers upward and track the max length.
 *   This guarantees each element is visited at most twice -> O(n).
 */
public class LongestConsecutiveSequence {

    public int longestConsecutive(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0;
        }

        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }

        int longest = 0;

        for (int num : numSet) {
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (numSet.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                longest = Math.max(longest, currentStreak);
            }
        }

        return longest;
    }

    public static void main(String[] args) {
        LongestConsecutiveSequence solution = new LongestConsecutiveSequence();

        int[] test1 = {100, 4, 200, 1, 3, 2};
        System.out.println("Test 1: " + solution.longestConsecutive(test1)); // 4

        int[] test2 = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
        System.out.println("Test 2: " + solution.longestConsecutive(test2)); // 9

        int[] test3 = {};
        System.out.println("Test 3: " + solution.longestConsecutive(test3)); // 0

        int[] test4 = {1};
        System.out.println("Test 4: " + solution.longestConsecutive(test4)); // 1

        int[] test5 = {1, 2, 0, 1};
        System.out.println("Test 5: " + solution.longestConsecutive(test5)); // 3

        int[] test6 = {-1, 0, 1, 2, -2, -3};
        System.out.println("Test 6: " + solution.longestConsecutive(test6)); // 6

        System.out.println("All tests passed!");
    }
}
