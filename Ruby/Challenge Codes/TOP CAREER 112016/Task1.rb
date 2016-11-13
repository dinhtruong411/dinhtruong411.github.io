#!/usr/bin/ruby

def solution(a, k)
    a.map!(&:to_s)
    num_size = a[0].length
    (0...a.length).each do |i|
        num_size = a[i].length if a[i].length > num_size
    end
    (0...a.length).each do |i|
        a[i] = a[i].center(num_size)
    end
    row = a.length/k
    last_row = a.length - k*row

    row_line = ['+']
    (1..k).each do |i|
        (1..num_size).each do |ii|
            row_line << '-'
        end
        row_line << '+'
    end

    last_row_line = ['+']
    (1..last_row).each do |i|
        (1..num_size).each do |ii|
            last_row_line << '-'
        end
        last_row_line << '+'
    end

    if row != 0
        puts row_line*''
        (0...row).each do |i|
            num_row = ['|']
            (0...k).each do |ii|
                num_row << a[k*i + ii]
                num_row << '|'
            end
            puts num_row*''
            puts row_line*''
        end
    else
        puts last_row_line*''
    end
    if last_row != 0
        num_row = ['|']
        (0...last_row).each do |i|
            num_row << a[k*row + i]
            num_row << '|'
        end
        puts num_row*''
        puts last_row_line*''
    end
end
